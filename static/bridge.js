(function (global) {
  "use strict";

  const bridge = {};
  const peers = new Map();
  const remoteStreams = new Map();
  const pendingCandidates = new Map();
  let eventCallback = null;
  let session = null;
  let polling = false;

  function emit(type, first = "", second = "", third = "") {
    if (eventCallback) eventCallback(type, first, second, third);
  }

  function element(id) {
    return document.getElementById(id);
  }

  function errorText(error) {
    if (error && error.message) return String(error.message);
    return String(error || "操作失败");
  }

  async function request(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(session && session.token ? { Authorization: `Bearer ${session.token}` } : {}),
        ...(options.headers || {}),
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `请求失败 (${response.status})`);
    return payload;
  }

  function setView(name) {
    element("lobby").classList.toggle("hidden", name !== "lobby");
    element("room").classList.toggle("hidden", name !== "room");
  }

  function startEvents(sequence) {
    if (polling) return;
    polling = true;
    let since = sequence;

    async function poll() {
      while (polling && session) {
        try {
          const result = await request(
            `/api/rooms/${session.roomCode}/events?clientId=${encodeURIComponent(session.clientId)}&since=${since}`,
          );
          emit("network", "online");
          for (const event of result.events) {
            since = Math.max(since, event.sequence);
            if (event.type === "participant-joined") {
              emit("participant", event.payload.id, event.payload.name, String(event.payload.isHost));
            } else if (event.type === "participant-left") {
              emit("participant-left", event.payload.id);
            } else if (event.type === "room-closed") {
              emit("room-closed", event.payload.reason || "房间已结束");
              return;
            } else if (event.type === "signal") {
              const data = event.payload.data || {};
              if (data.type === "description") {
                emit("signal", event.payload.from, "description", JSON.stringify(data.description));
              } else if (data.type === "candidate") {
                emit("signal", event.payload.from, "candidate", JSON.stringify(data.candidate));
              } else if (data.type === "stage-start" || data.type === "stage-stop") {
                emit("signal", event.payload.from, "control", data.type);
              }
            }
          }
          since = Math.max(since, result.sequence);
        } catch (error) {
          if (!polling || !session) return;
          if (/重新加入|已结束/.test(errorText(error))) {
            emit("room-closed", errorText(error));
            return;
          }
          emit("network", "offline");
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }
      }
    }

    poll();
  }

  function beginSession(payload) {
    session = {
      roomCode: payload.roomCode,
      clientId: payload.clientId,
      token: payload.sessionToken,
      hostId: payload.hostId,
      iceServers: payload.iceServers || [],
    };
    for (const participant of payload.participants) {
      emit("participant", participant.id, participant.name, String(participant.isHost));
    }
  }

  function closePeer(peerId) {
    const peer = peers.get(peerId);
    if (peer) peer.close();
    peers.delete(peerId);
    remoteStreams.delete(peerId);
  }

  bridge.initialize = (callback) => {
    eventCallback = callback;
  };

  bridge.getName = () => element("name-input").value.trim();
  bridge.getJoinCode = () => element("code-input").value.trim().toUpperCase();

  bridge.createRoom = (name, callback) => {
    request("/api/rooms", { method: "POST", body: JSON.stringify({ name }) })
      .then((payload) => {
        beginSession(payload);
        callback("", payload.roomCode, payload.clientId, payload.sessionToken);
        startEvents(payload.sequence);
      })
      .catch((error) => callback(errorText(error), "", "", ""));
  };

  bridge.joinRoom = (code, name, callback) => {
    request(`/api/rooms/${encodeURIComponent(code)}/join`, {
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then((payload) => {
        beginSession(payload);
        callback("", payload.roomCode, payload.clientId, payload.sessionToken, payload.hostId);
        startEvents(payload.sequence);
      })
      .catch((error) => callback(errorText(error), "", "", "", ""));
  };

  bridge.sendSignal = (to, type, payload) => {
    if (!session) return;
    const data = { type };
    if (type === "description" || type === "candidate") data[type] = JSON.parse(payload);
    request(`/api/rooms/${session.roomCode}/signal`, {
      method: "POST",
      body: JSON.stringify({ clientId: session.clientId, to, data }),
    }).catch((error) => emit("signal-error", errorText(error)));
  };

  bridge.leave = () => {
    if (!session) return;
    const current = session;
    polling = false;
    session = null;
    for (const peerId of [...peers.keys()]) closePeer(peerId);
    request(`/api/rooms/${current.roomCode}/leave`, {
      method: "DELETE",
      body: JSON.stringify({ clientId: current.clientId }),
      headers: { Authorization: `Bearer ${current.token}` },
    }).catch(() => {});
  };

  bridge.setText = (id, text) => {
    element(id).textContent = text;
  };

  bridge.setButtonEnabled = (id, enabled) => {
    element(id).disabled = !enabled;
  };

  bridge.showElement = (id, visible) => {
    element(id).classList.toggle("hidden", !visible);
  };

  bridge.setView = setView;

  bridge.clearParticipants = () => {
    element("participant-list").replaceChildren();
  };

  bridge.addParticipant = (id, name, isHost, connected) => {
    const item = document.createElement("li");
    item.dataset.participantId = id;
    item.textContent = `${name}${isHost ? "（房主）" : ""} · ${connected ? "已连接" : "等待连接"}`;
    element("participant-list").append(item);
  };

  bridge.updateParticipant = (id, connected) => {
    const item = [...element("participant-list").children].find((child) => child.dataset.participantId === id);
    if (item) {
      const label = item.textContent.split(" · ")[0];
      item.textContent = `${label} · ${connected ? "已连接" : "等待连接"}`;
    }
  };

  bridge.removeParticipant = (id) => {
    const item = [...element("participant-list").children].find((child) => child.dataset.participantId === id);
    if (item) item.remove();
  };

  bridge.startSharing = (callback) => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: { frameRate: { ideal: 30, max: 30 } },
        audio: {
          channelCount: 2,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        selfBrowserSurface: "exclude",
        systemAudio: "include",
      })
      .then((stream) => {
        bridge.displayStream = stream;
        const video = element("stage-video");
        video.srcObject = stream;
        video.muted = true;
        stream.getVideoTracks()[0].addEventListener("ended", () => emit("display-ended"), { once: true });
        callback(true, stream.getAudioTracks().length > 0, "");
      })
      .catch((error) => callback(false, false, errorText(error)));
  };

  bridge.stopSharing = () => {
    if (!bridge.displayStream) return;
    for (const track of bridge.displayStream.getTracks()) track.stop();
    bridge.displayStream = null;
    element("stage-video").srcObject = null;
  };

  bridge.createPeer = (peerId, isHost) => {
    if (peers.has(peerId)) return;
    const peer = new RTCPeerConnection({ iceServers: session ? session.iceServers : [] });
    peers.set(peerId, peer);
    peer.onicecandidate = (event) => {
      if (!event.candidate) return;
      if (/typ relay/i.test(event.candidate.candidate || "")) return;
      emit("ice", peerId, JSON.stringify(event.candidate));
    };
    peer.ontrack = (event) => {
      let stream = remoteStreams.get(peerId);
      if (!stream) {
        stream = new MediaStream();
        remoteStreams.set(peerId, stream);
      }
      stream.addTrack(event.track);
      const video = element("stage-video");
      video.srcObject = stream;
      video.play().catch(() => {});
      emit("track", peerId, event.track.kind);
    };
    peer.onconnectionstatechange = () => emit("state", peerId, peer.connectionState);
    if (isHost && bridge.displayStream) {
      for (const track of bridge.displayStream.getTracks()) peer.addTrack(track, bridge.displayStream);
    }
  };

  bridge.createOffer = (peerId, callback) => {
    const peer = peers.get(peerId);
    if (!peer) {
      callback(false, "");
      return;
    }
    peer
      .createOffer()
      .then((description) => peer.setLocalDescription(description))
      .then(() => callback(true, JSON.stringify(peer.localDescription)))
      .catch((error) => {
        emit("signal-error", errorText(error));
        callback(false, "");
      });
  };

  bridge.handleDescription = (peerId, descriptionJson, callback) => {
    const peer = peers.get(peerId);
    if (!peer) {
      callback(false, "");
      return;
    }
    peer
      .setRemoteDescription(JSON.parse(descriptionJson))
      .then(() => {
        const candidates = pendingCandidates.get(peerId) || [];
        pendingCandidates.delete(peerId);
        return Promise.all(candidates.map((candidate) => peer.addIceCandidate(candidate)));
      })
      .then(() => {
        if (peer.remoteDescription.type !== "offer") {
          callback(true, "");
          return;
        }
        return peer
          .createAnswer()
          .then((answer) => peer.setLocalDescription(answer))
          .then(() => callback(true, JSON.stringify(peer.localDescription)));
      })
      .catch((error) => {
        emit("signal-error", errorText(error));
        callback(false, "");
      });
  };

  bridge.addCandidate = (peerId, candidateJson, callback) => {
    const peer = peers.get(peerId);
    if (!peer) {
      callback(false);
      return;
    }
    const candidate = JSON.parse(candidateJson);
    if (/typ relay/i.test(candidate.candidate || "")) {
      callback(false);
      return;
    }
    if (!peer.remoteDescription) {
      const candidates = pendingCandidates.get(peerId) || [];
      candidates.push(candidate);
      pendingCandidates.set(peerId, candidates);
      callback(true);
      return;
    }
    peer
      .addIceCandidate(candidate)
      .then(() => callback(true))
      .catch((error) => {
        emit("signal-error", errorText(error));
        callback(false);
      });
  };

  bridge.closePeer = closePeer;

  bridge.getPeerState = (peerId) => {
    const peer = peers.get(peerId);
    if (!peer) return "closed";
    return `${peer.connectionState}/${peer.iceConnectionState}`;
  };

  global.MoonCastBridge = bridge;
})(window);
