import json
import threading
import unittest
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer
from concurrent.futures import ThreadPoolExecutor

import server


class MoonCastServerTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.httpd = ThreadingHTTPServer(("127.0.0.1", 0), server.MoonCastHandler)
        cls.base_url = f"http://127.0.0.1:{cls.httpd.server_port}"
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.thread.join(timeout=2)

    def request(self, path, method="GET", payload=None, token=None):
        body = None if payload is None else json.dumps(payload).encode()
        headers = {}
        if body is not None:
            headers["Content-Type"] = "application/json"
        if token:
            headers["Authorization"] = f"Bearer {token}"
        request = urllib.request.Request(
            self.base_url + path,
            data=body,
            headers=headers,
            method=method,
        )
        with urllib.request.urlopen(request, timeout=2) as response:
            return json.loads(response.read())

    def test_room_lifecycle_and_targeted_signal(self):
        host = self.request("/api/rooms", "POST", {"name": "Host"})
        self.assertTrue(host["isHost"])
        self.assertEqual(len(host["participants"]), 1)

        guest = self.request(
            f"/api/rooms/{host['roomCode']}/join",
            "POST",
            {"name": "Guest"},
        )
        self.assertFalse(guest["isHost"])
        self.assertEqual(guest["hostId"], host["clientId"])

        self.request(
            f"/api/rooms/{host['roomCode']}/signal",
            "POST",
            {
                "clientId": host["clientId"],
                "to": guest["clientId"],
                "data": {"channel": "stage", "type": "stage-start"},
            },
            token=host["sessionToken"],
        )
        events = self.request(
            f"/api/rooms/{host['roomCode']}/events"
            f"?clientId={guest['clientId']}&since={guest['sequence']}",
            token=guest["sessionToken"],
        )
        signal_events = [
            event
            for event in events["events"]
            if event["type"] == "signal"
            and event["payload"]["data"]["type"] == "stage-start"
        ]
        self.assertEqual(len(signal_events), 1)
        self.assertEqual(signal_events[0]["recipient"], guest["clientId"])

        with ThreadPoolExecutor(max_workers=1) as executor:
            event_request = executor.submit(
                self.request,
                f"/api/rooms/{host['roomCode']}/events"
                f"?clientId={guest['clientId']}&since={events['sequence']}",
                token=guest["sessionToken"],
            )
            self.request(
                f"/api/rooms/{host['roomCode']}/leave",
                "DELETE",
                {"clientId": host["clientId"]},
                token=host["sessionToken"],
            )
            closed_events = event_request.result(timeout=2)

        self.assertTrue(
            any(event["type"] == "room-closed" for event in closed_events["events"])
        )

        with self.assertRaises(urllib.error.HTTPError) as context:
            self.request(
                f"/api/rooms/{host['roomCode']}/events"
                f"?clientId={guest['clientId']}&since={closed_events['sequence']}",
                token=guest["sessionToken"],
            )
        self.assertEqual(context.exception.code, 404)

    def test_health(self):
        payload = self.request("/api/health")
        self.assertTrue(payload["ok"])
        self.assertTrue(payload["p2p"])
        self.assertFalse(payload["turn"])

    def test_responses_include_security_headers(self):
        with urllib.request.urlopen(self.base_url + "/api/health", timeout=2) as response:
            self.assertEqual(response.headers["X-Content-Type-Options"], "nosniff")
            self.assertEqual(response.headers["X-Frame-Options"], "DENY")
            self.assertEqual(response.headers["Referrer-Policy"], "no-referrer")

    def test_invalid_join_returns_error(self):
        with self.assertRaises(urllib.error.HTTPError) as context:
            self.request("/api/rooms/AAAAAA/join", "POST", {"name": "Guest"})
        self.assertEqual(context.exception.code, 400)


if __name__ == "__main__":
    unittest.main()
