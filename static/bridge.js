(function (global) {
  "use strict";

  const bridge = {};
  const peers = new Map();
  const pendingCandidates = new Map();
  const voiceStreams = new Map();
  const stageSenderIds = new Set();
  let eventCallback = null;
  let session = null;
  let polling = false;
  let stageRemoteStream = null;

  const qualityProfiles = {
    smooth: { height: 720, maxBitrate: 5_000_000, maxFramerate: 30 },
    clear: { height: 1080, maxBitrate: 10_000_000, maxFramerate: 30 },
    high: { height: 1080, maxBitrate: 20_000_000, maxFramerate: 60 },
  };

  function emit(type, first = "", second = "", third = "", fourth = "") {
    if (eventCallback) eventCallback(type, first, second, third, fourth);
  }

  function element(id) {
    return document.getElementById(id);
  }

  function errorText(error) {
    if (error && error.message) return String(error.message);
    return String(error || "操作失败");
  }

  function peerKey(channel, peerId) {
    return `${channel}:${peerId}`;
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
                emit("signal", event.payload.from, data.channel, "description", JSON.stringify(data.description));
              } else if (data.type === "candidate") {
                emit("signal", event.payload.from, data.channel, "candidate", JSON.stringify(data.candidate));
              } else if (data.type === "stage-topology") {
                emit("signal", event.payload.from, data.channel, "topology", String(data.value || ""));
              } else if (data.type === "stage-quality") {
                emit("signal", event.payload.from, data.channel, "quality", String(data.value || "high"));
              } else if (data.type === "member-state") {
                emit("signal", event.payload.from, data.channel, "member-state", String(data.value || ""));
              } else {
                emit("signal", event.payload.from, data.channel, "control", data.type || "");
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
  }

  function emitParticipants(payload) {
    for (const participant of payload.participants) {
      emit("participant", participant.id, participant.name, String(participant.isHost));
    }
  }

  function closePeer(channel, peerId) {
    const key = peerKey(channel, peerId);
    const peer = peers.get(key);
    if (peer) peer.close();
    peers.delete(key);
    pendingCandidates.delete(key);
    if (channel === "voice") {
      voiceStreams.delete(peerId);
      element("remote-audio").querySelector(`[data-peer-id="${CSS.escape(peerId)}"]`)?.remove();
    }
    if (channel === "stage") stageSenderIds.delete(peerId);
  }

  function ensureVoiceAudio(peerId) {
    let stream = voiceStreams.get(peerId);
    if (!stream) {
      stream = new MediaStream();
      voiceStreams.set(peerId, stream);
    }
    let audio = element("remote-audio").querySelector(`[data-peer-id="${CSS.escape(peerId)}"]`);
    if (!audio) {
      audio = document.createElement("audio");
      audio.autoplay = true;
      audio.playsInline = true;
      audio.dataset.peerId = peerId;
      element("remote-audio").append(audio);
    }
    if (audio.srcObject !== stream) audio.srcObject = stream;
    audio.play().catch(() => {});
    return stream;
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
        emitParticipants(payload);
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
        emitParticipants(payload);
        startEvents(payload.sequence);
      })
      .catch((error) => callback(errorText(error), "", "", "", ""));
  };

  bridge.sendSignal = (to, channel, type, payload) => {
    if (!session) return;
    const data = { channel, type };
    if (type === "description" || type === "candidate") {
      data[type] = JSON.parse(payload);
    } else {
      data.value = payload;
    }
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
    for (const key of [...peers.keys()]) {
      const [channel, peerId] = key.split(":");
      closePeer(channel, peerId);
    }
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

  bridge.addParticipant = (id, name, isHost, voiceConnected, stageConnected, muted) => {
    const item = document.createElement("li");
    item.dataset.participantId = id;
    const title = document.createElement("strong");
    title.textContent = `${name}${isHost ? "（房主）" : ""}`;
    const detail = document.createElement("span");
    detail.textContent = `语音 ${voiceConnected ? "已连接" : "等待"} · 画面 ${stageConnected ? "已连接" : "等待"}${muted ? " · 已静音" : ""}`;
    item.append(title, detail);
    element("participant-list").append(item);
  };

  bridge.updateParticipant = (id, voiceConnected, stageConnected, muted) => {
    const item = [...element("participant-list").children].find((child) => child.dataset.participantId === id);
    if (!item) return;
    item.querySelector("span").textContent = `语音 ${voiceConnected ? "已连接" : "等待"} · 画面 ${stageConnected ? "已连接" : "等待"}${muted ? " · 已静音" : ""}`;
  };

  bridge.removeParticipant = (id) => {
    const item = [...element("participant-list").children].find((child) => child.dataset.participantId === id);
    if (item) item.remove();
  };

  bridge.startSharing = (callback) => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: { frameRate: { ideal: 60, max: 60 } },
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

  bridge.startMicrophone = (callback) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      .then((stream) => {
        bridge.microphoneStream = stream;
        for (const track of stream.getTracks()) {
          track.addEventListener("ended", () => emit("microphone-ended"), { once: true });
        }
        for (const [key, peer] of peers) {
          if (!key.startsWith("voice:")) continue;
          for (const track of stream.getTracks()) peer.addTrack(track, stream);
        }
        callback(true, "");
      })
      .catch((error) => callback(false, errorText(error)));
  };

  bridge.stopMicrophone = () => {
    if (!bridge.microphoneStream) return;
    for (const track of bridge.microphoneStream.getTracks()) track.stop();
    bridge.microphoneStream = null;
  };

  bridge.setMicrophoneEnabled = (enabled) => {
    if (!bridge.microphoneStream) return;
    for (const track of bridge.microphoneStream.getAudioTracks()) track.enabled = enabled;
  };

  bridge.setStageSoundEnabled = (enabled) => {
    bridge.stageSoundEnabled = enabled;
    element("stage-video").muted = !enabled;
  };

  bridge.createPeer = (channel, peerId, isSender) => {
    const key = peerKey(channel, peerId);
    if (peers.has(key)) return;
    const peer = new RTCPeerConnection({ iceServers: session ? session.iceServers : [] });
    peers.set(key, peer);
    peer.onicecandidate = (event) => {
      if (!event.candidate) return;
      if (/typ relay/i.test(event.candidate.candidate || "")) return;
      emit("ice", channel, peerId, JSON.stringify(event.candidate));
    };
    peer.ontrack = (event) => {
      if (channel === "voice") {
        ensureVoiceAudio(peerId).addTrack(event.track);
      } else {
        if (!stageRemoteStream) stageRemoteStream = new MediaStream();
        stageRemoteStream.addTrack(event.track);
        const video = element("stage-video");
        video.srcObject = stageRemoteStream;
        video.muted = !bridge.stageSoundEnabled;
        video.play().catch(() => {});
        for (const childId of stageSenderIds) {
          const key = peerKey("stage", childId);
          const peer = peers.get(key);
          if (peer.connectionState === "closed") continue;
          const sender = peer.getSenders().find((item) => item.track?.kind === event.track.kind);
          if (sender) {
            if (sender.track !== event.track) sender.replaceTrack(event.track).catch(() => {});
          } else {
            peer.addTrack(event.track, stageRemoteStream);
            if (peer.signalingState === "stable") {
              peer
                .createOffer()
                .then((description) => peer.setLocalDescription(description))
                .then(() => bridge.sendSignal(childId, "stage", "description", JSON.stringify(peer.localDescription)))
                .catch((error) => emit("signal-error", errorText(error)));
            }
          }
        }
      }
      emit("track", channel, peerId, event.track.kind);
    };
    peer.onconnectionstatechange = () => emit("state", channel, peerId, peer.connectionState);
    if (channel === "voice" && bridge.microphoneStream) {
      for (const track of bridge.microphoneStream.getTracks()) peer.addTrack(track, bridge.microphoneStream);
    }
    if (channel === "stage" && isSender) {
      stageSenderIds.add(peerId);
      const source = bridge.displayStream || stageRemoteStream;
      if (source) for (const track of source.getTracks()) peer.addTrack(track, source);
    }
  };

  bridge.createOffer = (channel, peerId, iceRestart, callback) => {
    const peer = peers.get(peerKey(channel, peerId));
    if (!peer) {
      callback(false, "");
      return;
    }
    peer
      .createOffer({ iceRestart })
      .then((description) => peer.setLocalDescription(description))
      .then(() => callback(true, JSON.stringify(peer.localDescription)))
      .catch((error) => {
        emit("signal-error", errorText(error));
        callback(false, "");
      });
  };

  bridge.handleDescription = (channel, peerId, descriptionJson, callback) => {
    const peer = peers.get(peerKey(channel, peerId));
    if (!peer) {
      callback(false, "");
      return;
    }
    peer
      .setRemoteDescription(JSON.parse(descriptionJson))
      .then(() => {
        const candidates = pendingCandidates.get(peerKey(channel, peerId)) || [];
        pendingCandidates.delete(peerKey(channel, peerId));
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

  bridge.addCandidate = (channel, peerId, candidateJson, callback) => {
    const key = peerKey(channel, peerId);
    const peer = peers.get(key);
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
      const candidates = pendingCandidates.get(key) || [];
      candidates.push(candidate);
      pendingCandidates.set(key, candidates);
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

  bridge.setSenderQuality = (channel, peerId, quality) => {
    const peer = peers.get(peerKey(channel, peerId));
    const profile = qualityProfiles[quality] || qualityProfiles.high;
    const sender = peer?.getSenders().find((item) => item.track?.kind === "video");
    if (!sender) return;
    const parameters = sender.getParameters();
    const sourceHeight = sender.track.getSettings().height || profile.height;
    parameters.encodings = parameters.encodings?.length ? parameters.encodings : [{}];
    parameters.encodings[0].scaleResolutionDownBy = Math.max(1, sourceHeight / profile.height);
    parameters.encodings[0].maxBitrate = profile.maxBitrate;
    parameters.encodings[0].maxFramerate = profile.maxFramerate;
    parameters.degradationPreference = quality === "high" ? "maintain-framerate" : "maintain-resolution";
    sender.setParameters(parameters).catch((error) => emit("signal-error", errorText(error)));
  };

  bridge.closePeer = closePeer;

  bridge.getPeerState = (channel, peerId) => {
    const peer = peers.get(peerKey(channel, peerId));
    if (!peer) return "closed";
    return `${peer.connectionState}/${peer.iceConnectionState}`;
  };

  bridge.schedule = (callback, delay) => {
    setTimeout(callback, delay);
  };

  global.MoonCastBridge = bridge;
})(window);
