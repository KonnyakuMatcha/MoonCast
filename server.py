#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import mimetypes
import secrets
import ssl
import string
import threading
import time
from dataclasses import dataclass, field
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parent
STATIC_DIR = ROOT / "static"
MAX_BODY_BYTES = 256_000
MAX_PARTICIPANTS = 12
PARTICIPANT_TTL_SECONDS = 45
ROOM_TTL_SECONDS = 6 * 60 * 60
ROOM_ALPHABET = string.ascii_uppercase.replace("I", "").replace("O", "") + "23456789"
DEFAULT_STUN_URL = "stun:stun.l.google.com:19302"


@dataclass
class Participant:
    client_id: str
    name: str
    token: str
    last_seen: float = field(default_factory=time.time)


@dataclass
class Room:
    code: str
    host_id: str
    participants: dict[str, Participant]
    next_sequence: int = 1
    events: list[dict] = field(default_factory=list)
    condition: threading.Condition = field(default_factory=threading.Condition)

    def publish(self, event_type: str, payload: dict, recipient: str | None = None) -> None:
        with self.condition:
            self.events.append(
                {
                    "sequence": self.next_sequence,
                    "type": event_type,
                    "payload": payload,
                    "recipient": recipient,
                }
            )
            self.next_sequence += 1
            if len(self.events) > 2_000:
                self.events = self.events[-1_000:]
            self.condition.notify_all()


class RoomStore:
    def __init__(self) -> None:
        self.rooms: dict[str, Room] = {}
        self.lock = threading.RLock()

    @staticmethod
    def new_client_id() -> str:
        return secrets.token_urlsafe(24)

    @staticmethod
    def clean_name(value: object) -> str:
        name = str(value or "").strip()
        if not name:
            raise ValueError("请输入昵称")
        return name[:24]

    def cleanup(self) -> None:
        now = time.time()
        with self.lock:
            for room in list(self.rooms.values()):
                for client_id, participant in list(room.participants.items()):
                    if now - participant.last_seen > PARTICIPANT_TTL_SECONDS:
                        room.participants.pop(client_id, None)
                        room.publish("participant-left", {"id": client_id})
                if not room.participants or now - max(
                    participant.last_seen for participant in room.participants.values()
                ) > ROOM_TTL_SECONDS:
                    self.rooms.pop(room.code, None)

    def create(self, name: str) -> tuple[Room, Participant]:
        with self.lock:
            self.cleanup()
            while True:
                code = "".join(secrets.choice(ROOM_ALPHABET) for _ in range(6))
                if code not in self.rooms:
                    break
            participant = Participant(self.new_client_id(), self.clean_name(name), secrets.token_urlsafe(32))
            room = Room(code, participant.client_id, {participant.client_id: participant})
            self.rooms[code] = room
            return room, participant

    def join(self, code: str, name: str) -> tuple[Room, Participant]:
        with self.lock:
            self.cleanup()
            room = self.rooms.get(code.upper())
            if not room:
                raise LookupError("房间不存在或已经结束")
            if len(room.participants) >= MAX_PARTICIPANTS:
                raise ValueError("房间人数已满")
            participant = Participant(self.new_client_id(), self.clean_name(name), secrets.token_urlsafe(32))
            room.participants[participant.client_id] = participant
            room.publish(
                "participant-joined",
                {
                    "id": participant.client_id,
                    "name": participant.name,
                    "isHost": participant.client_id == room.host_id,
                },
            )
            return room, participant

    def authenticate(self, room: Room, client_id: str, token: str) -> Participant:
        participant = room.participants.get(client_id)
        if not participant or not token or not secrets.compare_digest(participant.token, token):
            raise PermissionError("会话已失效，请重新加入房间")
        participant.last_seen = time.time()
        return participant

    def leave(self, room: Room, client_id: str) -> None:
        participant = room.participants.pop(client_id, None)
        if not participant:
            return
        if client_id == room.host_id:
            room.publish("room-closed", {"reason": "房主已结束房间"})
            with self.lock:
                self.rooms.pop(room.code, None)
        else:
            room.publish("participant-left", {"id": client_id})


STORE = RoomStore()


class MoonCastHandler(BaseHTTPRequestHandler):
    server_version = "MoonCast/0.1"

    def send_security_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")

    def log_message(self, fmt: str, *args: object) -> None:
        print(f"[{self.log_date_time_string()}] {fmt % args}")

    def send_json(self, payload: dict | list, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_security_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0 or length > MAX_BODY_BYTES:
            raise ValueError("请求内容为空或过大")
        value = json.loads(self.rfile.read(length))
        if not isinstance(value, dict):
            raise ValueError("请求格式无效")
        return value

    def bearer_token(self) -> str:
        authorization = self.headers.get("Authorization", "")
        scheme, _, token = authorization.partition(" ")
        return token if scheme.lower() == "bearer" else ""

    def room_response(self, room: Room, participant: Participant) -> dict:
        return {
            "roomCode": room.code,
            "clientId": participant.client_id,
            "sessionToken": participant.token,
            "hostId": room.host_id,
            "isHost": participant.client_id == room.host_id,
            "sequence": room.next_sequence - 1,
            "iceServers": [{"urls": [DEFAULT_STUN_URL]}],
            "participants": [
                {
                    "id": item.client_id,
                    "name": item.name,
                    "isHost": item.client_id == room.host_id,
                }
                for item in room.participants.values()
            ],
        }

    def handle_one_request(self) -> None:
        try:
            super().handle_one_request()
        except (BrokenPipeError, ConnectionResetError):
            self.close_connection = True

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self.send_json({"ok": True, "p2p": True, "turn": False})
            return
        if parsed.path.startswith("/api/rooms/") and parsed.path.endswith("/events"):
            self.get_events(parsed)
            return
        self.serve_static(parsed.path)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        try:
            payload = self.read_json()
            if parsed.path == "/api/rooms":
                room, participant = STORE.create(str(payload.get("name", "")))
                self.send_json(self.room_response(room, participant), HTTPStatus.CREATED)
                return
            if len(parts) == 4 and parts[:2] == ["api", "rooms"] and parts[3] == "join":
                room, participant = STORE.join(parts[2], str(payload.get("name", "")))
                self.send_json(self.room_response(room, participant))
                return
            if len(parts) == 4 and parts[:2] == ["api", "rooms"] and parts[3] == "signal":
                with STORE.lock:
                    room = STORE.rooms.get(parts[2].upper())
                    if not room:
                        raise LookupError("房间不存在或已经结束")
                    participant = STORE.authenticate(room, str(payload.get("clientId", "")), self.bearer_token())
                    recipient = str(payload.get("to", ""))
                    if recipient not in room.participants:
                        raise LookupError("接收者已离开房间")
                    room.publish(
                        "signal",
                        {"from": participant.client_id, "data": payload.get("data")},
                        recipient,
                    )
                self.send_json({"ok": True})
                return
            self.send_json({"error": "接口不存在"}, HTTPStatus.NOT_FOUND)
        except (ValueError, LookupError) as error:
            self.send_json({"error": str(error)}, HTTPStatus.BAD_REQUEST)
        except PermissionError as error:
            self.send_json({"error": str(error)}, HTTPStatus.UNAUTHORIZED)
        except json.JSONDecodeError:
            self.send_json({"error": "请求格式无效"}, HTTPStatus.BAD_REQUEST)

    def do_DELETE(self) -> None:
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        try:
            if len(parts) == 4 and parts[:2] == ["api", "rooms"] and parts[3] == "leave":
                with STORE.lock:
                    room = STORE.rooms.get(parts[2].upper())
                    if not room:
                        raise LookupError("房间不存在或已经结束")
                    participant = STORE.authenticate(room, str(self.read_json().get("clientId", "")), self.bearer_token())
                    STORE.leave(room, participant.client_id)
                self.send_json({"ok": True})
                return
            self.send_json({"error": "接口不存在"}, HTTPStatus.NOT_FOUND)
        except (ValueError, LookupError) as error:
            self.send_json({"error": str(error)}, HTTPStatus.BAD_REQUEST)
        except PermissionError as error:
            self.send_json({"error": str(error)}, HTTPStatus.UNAUTHORIZED)

    def get_events(self, parsed) -> None:
        query = parse_qs(parsed.query)
        parts = parsed.path.strip("/").split("/")
        if len(parts) != 4 or parts[:2] != ["api", "rooms"]:
            self.send_json({"error": "接口不存在"}, HTTPStatus.NOT_FOUND)
            return
        with STORE.lock:
            room = STORE.rooms.get(parts[2].upper())
            if not room:
                self.send_json({"error": "房间不存在或已经结束"}, HTTPStatus.NOT_FOUND)
                return
            client_id = (query.get("clientId") or [""])[0]
            participant = room.participants.get(client_id)
            if not participant or not self.bearer_token():
                self.send_json({"error": "会话已失效，请重新加入房间"}, HTTPStatus.UNAUTHORIZED)
                return
            STORE.authenticate(room, client_id, self.bearer_token())
            try:
                since = int((query.get("since") or ["0"])[0])
            except ValueError:
                since = 0

        def event_for_client(event: dict) -> bool:
            return not event["recipient"] or event["recipient"] == client_id

        with room.condition:
            events = [event for event in room.events if event["sequence"] > since and event_for_client(event)]
            if not events:
                room.condition.wait_for(
                    lambda: any(
                        event["sequence"] > since and event_for_client(event)
                        for event in room.events
                    ),
                    timeout=20,
                )
                events = [event for event in room.events if event["sequence"] > since and event_for_client(event)]
        self.send_json({"sequence": room.next_sequence - 1, "events": events})

    def serve_static(self, request_path: str) -> None:
        path = "/index.html" if request_path == "/" else request_path
        file_path = (STATIC_DIR / path.lstrip("/")).resolve()
        if not file_path.is_file() or STATIC_DIR.resolve() not in file_path.parents:
            self.send_json({"error": "文件不存在"}, HTTPStatus.NOT_FOUND)
            return
        body = file_path.read_bytes()
        content_type = mimetypes.guess_type(file_path)[0] or "application/octet-stream"
        self.send_response(HTTPStatus.OK)
        self.send_security_headers()
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    parser = argparse.ArgumentParser(description="MoonCast signaling server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--tls-cert")
    parser.add_argument("--tls-key")
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), MoonCastHandler)
    if args.tls_cert and args.tls_key:
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(args.tls_cert, args.tls_key)
        server.socket = context.wrap_socket(server.socket, server_side=True)
    print(f"MoonCast listening on http{'s' if args.tls_cert else ''}://{args.host}:{args.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
