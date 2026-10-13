function _M0TP414konnyakumatcha7moocast3cmd4main8AppState(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9) {
  this.room_code = param0;
  this.client_id = param1;
  this.host_id = param2;
  this.sharing = param3;
  this.running = param4;
  this.microphone_ready = param5;
  this.microphone_muted = param6;
  this.shared_sound_enabled = param7;
  this.quality = param8;
  this.stage_parent = param9;
}
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
function $oob() {
  throw new Error("Index out of bounds");
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0MPB7JSArray6splice = (arr, idx, cnt) => arr.splice(idx, cnt);
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
const _M0FP414konnyakumatcha7moocast3cmd4main18bridge__initialize = (callback) => MoonCastBridge.initialize(callback);
const _M0FP414konnyakumatcha7moocast3cmd4main17bridge__get__name = () => MoonCastBridge.getName();
const _M0FP414konnyakumatcha7moocast3cmd4main23bridge__get__join__code = () => MoonCastBridge.getJoinCode();
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__get__quality = () => document.getElementById("quality-select").value;
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__room = (name, callback) => MoonCastBridge.createRoom(name, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main18bridge__join__room = (code, name, callback) => MoonCastBridge.joinRoom(code, name, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal = (recipient, channel, signalType, payload) => MoonCastBridge.sendSignal(recipient, channel, signalType, payload);
const _M0FP414konnyakumatcha7moocast3cmd4main13bridge__leave = () => MoonCastBridge.leave();
const _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text = (id, text) => MoonCastBridge.setText(id, text);
const _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled = (id, enabled) => MoonCastBridge.setButtonEnabled(id, enabled);
const _M0FP414konnyakumatcha7moocast3cmd4main25bridge__set__button__text = (id, text) => MoonCastBridge.setText(id, text);
const _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element = (id, visible) => MoonCastBridge.showElement(id, visible);
const _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view = (view) => MoonCastBridge.setView(view);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__clear__participants = () => MoonCastBridge.clearParticipants();
const _M0FP414konnyakumatcha7moocast3cmd4main24bridge__add__participant = (id, name, isHost, voiceConnected, stageConnected, muted) => MoonCastBridge.addParticipant(id, name, isHost, voiceConnected, stageConnected, muted);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__update__participant = (id, voiceConnected, stageConnected, muted) => MoonCastBridge.updateParticipant(id, voiceConnected, stageConnected, muted);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__remove__participant = (id) => MoonCastBridge.removeParticipant(id);
const _M0FP414konnyakumatcha7moocast3cmd4main22bridge__start__sharing = (callback) => MoonCastBridge.startSharing(callback);
const _M0FP414konnyakumatcha7moocast3cmd4main21bridge__stop__sharing = () => MoonCastBridge.stopSharing();
const _M0FP414konnyakumatcha7moocast3cmd4main25bridge__start__microphone = (callback) => MoonCastBridge.startMicrophone(callback);
const _M0FP414konnyakumatcha7moocast3cmd4main24bridge__stop__microphone = () => MoonCastBridge.stopMicrophone();
const _M0FP414konnyakumatcha7moocast3cmd4main32bridge__set__microphone__enabled = (enabled) => MoonCastBridge.setMicrophoneEnabled(enabled);
const _M0FP414konnyakumatcha7moocast3cmd4main34bridge__set__stage__sound__enabled = (enabled) => MoonCastBridge.setStageSoundEnabled(enabled);
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__peer = (channel, id, isSender) => MoonCastBridge.createPeer(channel, id, isSender);
const _M0FP414konnyakumatcha7moocast3cmd4main21bridge__create__offer = (channel, id, iceRestart, callback) => MoonCastBridge.createOffer(channel, id, iceRestart, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__handle__description = (channel, id, description, callback) => MoonCastBridge.handleDescription(channel, id, description, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main22bridge__add__candidate = (channel, id, candidate, callback) => MoonCastBridge.addCandidate(channel, id, candidate, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer = (channel, id) => MoonCastBridge.closePeer(channel, id);
const _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__sender__quality = (channel, id, quality) => MoonCastBridge.setSenderQuality(channel, id, quality);
const _M0FP414konnyakumatcha7moocast3cmd4main16bridge__schedule = (callback, delay) => MoonCastBridge.schedule(callback, delay);
function _M0TP414konnyakumatcha7moocast3cmd4main4Peer(param0, param1, param2, param3, param4) {
  this.id = param0;
  this.channel = param1;
  this.outbound = param2;
  this.attempts = param3;
  this.recovery_scheduled = param4;
}
function _M0TP414konnyakumatcha7moocast3cmd4main11Participant(param0, param1, param2, param3) {
  this.id = param0;
  this.voice_connected = param1;
  this.stage_connected = param2;
  this.muted = param3;
}
const _M0FP414konnyakumatcha7moocast3cmd4main9on__click = (id, handler) => document.getElementById(id).addEventListener("click", handler);
const _M0FP414konnyakumatcha7moocast3cmd4main10on__change = (id, handler) => document.getElementById(id).addEventListener("change", handler);
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0FP414konnyakumatcha7moocast3cmd4main5state = new _M0TP414konnyakumatcha7moocast3cmd4main8AppState("", "", "", false, false, false, false, true, "high", "");
const _M0FP414konnyakumatcha7moocast3cmd4main12participants = [];
const _M0FP414konnyakumatcha7moocast3cmd4main5peers = [];
const _M0FP414konnyakumatcha7moocast3cmd4main15stage__children = [];
function _M0FPC15abort5abortGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(msg) {
  return $panic();
}
function _M0MPB13StringBuilder13write__objectGiE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGiE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0MPB13StringBuilder10to__string(self) {
  return self.val;
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return self >= 55296 && self <= 56319;
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return self >= 56320 && self <= 57343;
}
function _M0IPC16uint166UInt16PB2Eq10not__equal(self, that) {
  return self !== that;
}
function _M0IP016_24default__implPB2Eq10not__equalGsE(x, y) {
  return !(x === y);
}
function _M0IP016_24default__implPB7Compare6op__ltGsE(x, y) {
  return _M0IPC16string6StringPB7Compare7compare(x, y) < 0;
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String21clamped__view_2einner(self, start, end) {
  const len = self.length;
  let lo = start < 0 ? 0 : start > len ? len : start;
  let hi;
  if (end === undefined) {
    hi = len;
  } else {
    const _Some = end;
    const _e = _Some;
    hi = _e < 0 ? 0 : _e > len ? len : _e;
  }
  if (lo > 0 && (lo < len && (_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(lo)) && _M0MPC16uint166UInt1622is__leading__surrogate(self.charCodeAt(lo - 1 | 0))))) {
    lo = lo + 1 | 0;
  }
  if (hi > 0 && (hi < len && (_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(hi)) && _M0MPC16uint166UInt1622is__leading__surrogate(self.charCodeAt(hi - 1 | 0))))) {
    hi = hi - 1 | 0;
  }
  return lo >= hi ? new _M0TPC16string10StringView(self, lo, lo) : new _M0TPC16string10StringView(self, lo, hi);
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String21clamped__view_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show6outputGiE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC13int3IntPB4Show10to__string(self));
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0IPC16string6StringPB7Compare7compare(self, other) {
  const len = self.length;
  const _bind = $compare_int(len, other.length);
  if (_bind === 0) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const x = self.charCodeAt(i);
        const y = other.charCodeAt(i);
        if (_M0IPC16uint166UInt16PB2Eq10not__equal(x, y)) {
          return x < y ? -1 : 1;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return 0;
  } else {
    return _bind;
  }
}
function _M0IPC13int3IntPB4Show10to__string(self) {
  return _M0MPC13int3Int18to__string_2einner(self, 10);
}
function _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(self, index) {
  if (index >= 0 && index < self.length) {
    const value = index >>> 0 < self.length ? self[index] : $oob();
    _M0MPB7JSArray6splice(self, index, 1);
    return value;
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(60);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "index out of bounds: the len is from 0 to ");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, self.length);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " but the index is ");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, index);
    return _M0FPC15abort5abortGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0MPB13StringBuilder10to__string(_string_builder));
  }
}
function _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array8containsGsE(self, value) {
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const v = self[_];
      if (v === value) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return false;
    }
  }
}
function _M0FP314konnyakumatcha7moocast3lib21plan__stage__topology(participant_ids, max_children) {
  const assignments = [];
  if (participant_ids.length === 0) {
    return assignments;
  }
  if (max_children <= 0 || participant_ids.length <= max_children) {
    const _bind = participant_ids.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const participant_id = participant_ids[_];
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(assignments, { _0: participant_id, _1: "host" });
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return assignments;
  }
  const relays = [];
  const _bind = participant_ids.length;
  let _tmp = 0;
  while (true) {
    const index = _tmp;
    if (index < _bind) {
      const participant_id = participant_ids[index];
      if (index < max_children) {
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(relays, participant_id);
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(assignments, { _0: participant_id, _1: "host" });
      }
      _tmp = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const relay_index = new _M0TPB8MutLocalGiE(0);
  const _bind$2 = participant_ids.length;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp$2;
    if (index < _bind$2) {
      const participant_id = participant_ids[index];
      if (index >= max_children) {
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(assignments, { _0: participant_id, _1: _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(relays, relay_index.val) });
        const _tmp$3 = relays.length;
        if (_tmp$3 === 0) {
          $panic();
        }
        relay_index.val = (relay_index.val + 1 | 0) % _tmp$3 | 0;
      }
      _tmp$2 = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return assignments;
}
function _M0FP414konnyakumatcha7moocast3cmd4main8is__host() {
  return _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id === _M0FP414konnyakumatcha7moocast3cmd4main5state.host_id && _M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.host_id, "");
}
function _M0FP414konnyakumatcha7moocast3cmd4main16has__participant(id) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (participant.id === id) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP414konnyakumatcha7moocast3cmd4main18participant__index(id) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const index = _tmp;
    if (index < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[index];
      if (participant.id === id) {
        return index;
      }
      _tmp = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return -1;
}
function _M0FP414konnyakumatcha7moocast3cmd4main11peer__index(channel, id) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main5peers.length;
  let _tmp = 0;
  while (true) {
    const index = _tmp;
    if (index < _bind) {
      const peer = _M0FP414konnyakumatcha7moocast3cmd4main5peers[index];
      if (peer.channel === channel && peer.id === id) {
        return index;
      }
      _tmp = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return -1;
}
function _M0FP414konnyakumatcha7moocast3cmd4main9has__peer(channel, id) {
  return _M0FP414konnyakumatcha7moocast3cmd4main11peer__index(channel, id) >= 0;
}
function _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer(channel, id, outbound) {
  if (_M0FP414konnyakumatcha7moocast3cmd4main9has__peer(channel, id)) {
    return undefined;
  }
  _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, new _M0TP414konnyakumatcha7moocast3cmd4main4Peer(id, channel, outbound, 0, false));
  _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__peer(channel, id, outbound);
}
function _M0FP414konnyakumatcha7moocast3cmd4main11close__peer(channel, id) {
  const index = _M0FP414konnyakumatcha7moocast3cmd4main11peer__index(channel, id);
  if (index >= 0) {
    _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index);
  }
  _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer(channel, id);
}
function _M0FP414konnyakumatcha7moocast3cmd4main14close__channel(channel) {
  const index = new _M0TPB8MutLocalGiE(_M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0);
  while (true) {
    if (index.val >= 0) {
      if (_M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index.val).channel === channel) {
        _M0FP414konnyakumatcha7moocast3cmd4main11close__peer(channel, _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index.val).id);
      }
      index.val = index.val - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(recipient, channel, signal_type, payload) {
  _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal(recipient, channel, signal_type, payload);
}
function _M0FP414konnyakumatcha7moocast3cmd4main11offer__peer(channel, id, ice_restart) {
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__create__offer(channel, id, ice_restart, (success, description) => {
    if (success) {
      _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(id, channel, "description", description);
      return;
    } else {
      return;
    }
  });
}
function _M0FP414konnyakumatcha7moocast3cmd4main14connect__voice(id) {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.running || id === _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id) {
    return undefined;
  }
  _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer("voice", id, false);
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready) {
    return undefined;
  }
  if (_M0IP016_24default__implPB7Compare6op__ltGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.client_id, id)) {
    _M0FP414konnyakumatcha7moocast3cmd4main11offer__peer("voice", id, false);
    return;
  } else {
    _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(id, "voice", "voice-ready", "");
    return;
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(id) {
  _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer("stage", id, true);
  _M0FP414konnyakumatcha7moocast3cmd4main11offer__peer("stage", id, false);
}
function _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status() {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.running) {
    return undefined;
  }
  const voice_connected = new _M0TPB8MutLocalGiE(0);
  const stage_connected = new _M0TPB8MutLocalGiE(0);
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      _L: {
        if (participant.id === _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id) {
          break _L;
        }
        if (participant.voice_connected) {
          voice_connected.val = voice_connected.val + 1 | 0;
        }
        if (participant.stage_connected) {
          stage_connected.val = stage_connected.val + 1 | 0;
        }
        break _L;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const total = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length - 1 | 0;
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("voice-status", _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready ? `语音 ${_M0MPC13int3Int18to__string_2einner(voice_connected.val, 10)}/${_M0MPC13int3Int18to__string_2einner(total, 10)} 已连接` : "等待麦克风权限");
  if (_M0FP414konnyakumatcha7moocast3cmd4main8is__host()) {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing ? `画面 ${_M0MPC13int3Int18to__string_2einner(stage_connected.val, 10)}/${_M0MPC13int3Int18to__string_2einner(total, 10)} 已连接 · 浅层树` : "尚未共享屏幕");
    return;
  } else {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing ? `正在接收画面 · ${_M0FP414konnyakumatcha7moocast3cmd4main5state.quality}` : "等待房主共享屏幕");
    return;
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main17publish__topology() {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main8is__host() || !_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    return undefined;
  }
  const ids = [];
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(ids, participant.id);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const plan = _M0FP314konnyakumatcha7moocast3lib21plan__stage__topology(ids, 3);
  const direct_children = [];
  const _bind$2 = plan.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const assignment = plan[_];
      _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(assignment._0, "stage", "stage-topology", assignment._1);
      if (assignment._1 === "host") {
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(direct_children, assignment._0);
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const stale_stage_children = [];
  const _bind$3 = _M0FP414konnyakumatcha7moocast3cmd4main5peers.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$3) {
      const peer = _M0FP414konnyakumatcha7moocast3cmd4main5peers[_];
      if (peer.channel === "stage" && (peer.outbound && !_M0MPC15array5Array8containsGsE(direct_children, peer.id))) {
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(stale_stage_children, peer.id);
      }
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$4 = stale_stage_children.length;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$4) {
      const child = stale_stage_children[_];
      _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("stage", child);
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const previous_children = [];
  const _bind$5 = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length;
  let _tmp$5 = 0;
  while (true) {
    const _ = _tmp$5;
    if (_ < _bind$5) {
      const child = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children[_];
      if (!_M0MPC15array5Array8containsGsE(direct_children, child)) {
        _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(previous_children, child);
      }
      _tmp$5 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (_M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length > 0) {
      _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length - 1 | 0);
      continue;
    } else {
      break;
    }
  }
  const _bind$6 = direct_children.length;
  let _tmp$6 = 0;
  while (true) {
    const _ = _tmp$6;
    if (_ < _bind$6) {
      const child = direct_children[_];
      _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, child);
      _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(child);
      _tmp$6 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$7 = previous_children.length;
  let _tmp$7 = 0;
  while (true) {
    const _ = _tmp$7;
    if (_ < _bind$7) {
      const child = previous_children[_];
      _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(child, "stage", "stage-release", "");
      _tmp$7 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
}
function _M0FP414konnyakumatcha7moocast3cmd4main16add__participant(id, name, participant_is_host) {
  if (id === "" || _M0FP414konnyakumatcha7moocast3cmd4main16has__participant(id)) {
    return undefined;
  }
  _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main12participants, new _M0TP414konnyakumatcha7moocast3cmd4main11Participant(id, false, false, false));
  _M0FP414konnyakumatcha7moocast3cmd4main24bridge__add__participant(id, name, participant_is_host, false, false, false);
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
    _M0FP414konnyakumatcha7moocast3cmd4main14connect__voice(id);
  }
  if (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    _M0FP414konnyakumatcha7moocast3cmd4main17publish__topology();
    return;
  } else {
    return;
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main19remove__participant(id) {
  const index = _M0FP414konnyakumatcha7moocast3cmd4main18participant__index(id);
  if (index >= 0) {
    _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main12participants, index);
  }
  _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("voice", id);
  _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("stage", id);
  if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, id)) {
    const _bind = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length;
    let _tmp = 0;
    while (true) {
      const child_index = _tmp;
      if (child_index < _bind) {
        const child = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children[child_index];
        if (child === id) {
          _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, child_index);
          break;
        }
        _tmp = child_index + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main27bridge__remove__participant(id);
  if (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    _M0FP414konnyakumatcha7moocast3cmd4main17publish__topology();
    return;
  } else {
    return;
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main11clear__room() {
  while (true) {
    if (_M0FP414konnyakumatcha7moocast3cmd4main12participants.length > 0) {
      _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main12participants, _M0FP414konnyakumatcha7moocast3cmd4main12participants.length - 1 | 0);
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (_M0FP414konnyakumatcha7moocast3cmd4main5peers.length > 0) {
      _M0FP414konnyakumatcha7moocast3cmd4main11close__peer(_M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, _M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0).channel, _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, _M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0).id);
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (_M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length > 0) {
      _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length - 1 | 0);
      continue;
    } else {
      break;
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main27bridge__clear__participants();
}
function _M0FP414konnyakumatcha7moocast3cmd4main28set__participant__connection(channel, id, connected) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (participant.id === id) {
        if (channel === "voice") {
          participant.voice_connected = connected;
        } else {
          participant.stage_connected = connected;
        }
        _M0FP414konnyakumatcha7moocast3cmd4main27bridge__update__participant(id, participant.voice_connected, participant.stage_connected, participant.muted);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main23set__participant__muted(id, muted) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (participant.id === id) {
        participant.muted = muted;
        _M0FP414konnyakumatcha7moocast3cmd4main27bridge__update__participant(id, participant.voice_connected, participant.stage_connected, muted);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main16update__controls() {
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("start-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running && (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && !_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing));
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("stop-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running && (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing));
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("mute-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running && _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("stage-sound-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("reconnect-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running);
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("start-button", _M0FP414konnyakumatcha7moocast3cmd4main8is__host());
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stop-button", _M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing);
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-sound-button", !_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing);
  _M0FP414konnyakumatcha7moocast3cmd4main25bridge__set__button__text("mute-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_muted ? "取消静音" : "静音麦克风");
  _M0FP414konnyakumatcha7moocast3cmd4main25bridge__set__button__text("stage-sound-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.shared_sound_enabled ? "关闭共享声音" : "开启共享声音");
}
function _M0FP414konnyakumatcha7moocast3cmd4main11enter__room() {
  _M0FP414konnyakumatcha7moocast3cmd4main5state.running = true;
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view("room");
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("room-code", `房间 ${_M0FP414konnyakumatcha7moocast3cmd4main5state.room_code}`);
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("signal-status", "信令已连接");
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", true);
  _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
  _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
  _M0FP414konnyakumatcha7moocast3cmd4main25bridge__start__microphone((success, error) => {
    _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready = success;
    if (success) {
      const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
          if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
            _M0FP414konnyakumatcha7moocast3cmd4main14connect__voice(participant.id);
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("voice-status", `麦克风不可用：${error}`);
    }
    _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
    _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
  });
}
function _M0FP414konnyakumatcha7moocast3cmd4main12create__room() {
  const name = _M0FP414konnyakumatcha7moocast3cmd4main17bridge__get__name();
  if (name === "") {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", "请输入昵称");
    return undefined;
  }
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__room(name, (error, room_code, client_id, _token) => {
    if (_M0IP016_24default__implPB2Eq10not__equalGsE(error, "")) {
      _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", error);
      _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", true);
      _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", true);
      return undefined;
    }
    _M0FP414konnyakumatcha7moocast3cmd4main5state.room_code = room_code;
    _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id = client_id;
    _M0FP414konnyakumatcha7moocast3cmd4main5state.host_id = client_id;
    _M0FP414konnyakumatcha7moocast3cmd4main11enter__room();
  });
}
function _M0FP414konnyakumatcha7moocast3cmd4main10join__room() {
  const name = _M0FP414konnyakumatcha7moocast3cmd4main17bridge__get__name();
  const code = _M0FP414konnyakumatcha7moocast3cmd4main23bridge__get__join__code();
  if (name === "") {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", "请输入昵称");
    return undefined;
  }
  if (code.length !== 6) {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", "请输入 6 位房间码");
    return undefined;
  }
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main18bridge__join__room(code, name, (error, room_code, client_id, _token, host_id) => {
    if (_M0IP016_24default__implPB2Eq10not__equalGsE(error, "")) {
      _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", error);
      _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", true);
      _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", true);
      return undefined;
    }
    _M0FP414konnyakumatcha7moocast3cmd4main5state.room_code = room_code;
    _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id = client_id;
    _M0FP414konnyakumatcha7moocast3cmd4main5state.host_id = host_id;
    _M0FP414konnyakumatcha7moocast3cmd4main11enter__room();
  });
}
function _M0FP414konnyakumatcha7moocast3cmd4main14restart__voice(id) {
  _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("voice", id);
  _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer("voice", id, false);
  _M0FP414konnyakumatcha7moocast3cmd4main11offer__peer("voice", id, false);
}
function _M0FP414konnyakumatcha7moocast3cmd4main14restart__stage(id) {
  _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("stage", id);
  _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(id);
}
function _M0FP414konnyakumatcha7moocast3cmd4main14start__sharing() {
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("start-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main22bridge__start__sharing((success, has_audio, error) => {
    if (!success) {
      _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", error);
      _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
      return undefined;
    }
    _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = true;
    _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", false);
    _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", has_audio ? "共享中 · 已包含来源声音" : "共享中 · 来源未提供声音");
    _M0FP414konnyakumatcha7moocast3cmd4main17publish__topology();
  });
}
function _M0FP414konnyakumatcha7moocast3cmd4main13stop__sharing() {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    return undefined;
  }
  _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = false;
  _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent = "";
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__stop__sharing();
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
        _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(participant.id, "stage", "stage-stop", "");
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main14close__channel("stage");
  while (true) {
    if (_M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length > 0) {
      _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length - 1 | 0);
      continue;
    } else {
      break;
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", true);
  _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
  _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
}
function _M0FP414konnyakumatcha7moocast3cmd4main11leave__room() {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.running) {
    return undefined;
  }
  _M0FP414konnyakumatcha7moocast3cmd4main5state.running = false;
  if (_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    _M0FP414konnyakumatcha7moocast3cmd4main21bridge__stop__sharing();
  }
  _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = false;
  _M0FP414konnyakumatcha7moocast3cmd4main24bridge__stop__microphone();
  _M0FP414konnyakumatcha7moocast3cmd4main13bridge__leave();
  _M0FP414konnyakumatcha7moocast3cmd4main11clear__room();
  _M0FP414konnyakumatcha7moocast3cmd4main5state.room_code = "";
  _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id = "";
  _M0FP414konnyakumatcha7moocast3cmd4main5state.host_id = "";
  _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent = "";
  _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready = false;
  _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_muted = false;
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view("lobby");
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", "已离开房间");
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", true);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", true);
}
function _M0FP414konnyakumatcha7moocast3cmd4main24broadcast__member__state() {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
        _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(participant.id, "voice", "member-state", _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_muted ? "muted" : "unmuted");
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main18toggle__microphone() {
  _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_muted = !_M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_muted;
  _M0FP414konnyakumatcha7moocast3cmd4main32bridge__set__microphone__enabled(!_M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_muted);
  _M0FP414konnyakumatcha7moocast3cmd4main24broadcast__member__state();
  _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
}
function _M0FP414konnyakumatcha7moocast3cmd4main20toggle__stage__sound() {
  _M0FP414konnyakumatcha7moocast3cmd4main5state.shared_sound_enabled = !_M0FP414konnyakumatcha7moocast3cmd4main5state.shared_sound_enabled;
  _M0FP414konnyakumatcha7moocast3cmd4main34bridge__set__stage__sound__enabled(_M0FP414konnyakumatcha7moocast3cmd4main5state.shared_sound_enabled);
  _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
}
function _M0FP414konnyakumatcha7moocast3cmd4main15change__quality() {
  _M0FP414konnyakumatcha7moocast3cmd4main5state.quality = _M0FP414konnyakumatcha7moocast3cmd4main20bridge__get__quality();
  if (!_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && (_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing && _M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, ""))) {
    _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "stage", "stage-quality", _M0FP414konnyakumatcha7moocast3cmd4main5state.quality);
  }
  _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
}
function _M0FP414konnyakumatcha7moocast3cmd4main13recover__peer(channel, id) {
  const index = _M0FP414konnyakumatcha7moocast3cmd4main11peer__index(channel, id);
  if (index < 0) {
    return undefined;
  }
  const peer = _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index);
  if (peer.attempts >= 3) {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", channel === "voice" ? "部分语音连接未恢复" : "部分画面连接未恢复");
    return undefined;
  }
  peer.attempts = peer.attempts + 1 | 0;
  if (channel === "voice") {
    if (_M0IP016_24default__implPB7Compare6op__ltGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.client_id, id)) {
      _M0FP414konnyakumatcha7moocast3cmd4main14restart__voice(id);
      return;
    } else {
      _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(id, "voice", "voice-restart", "");
      return;
    }
  } else {
    if (peer.outbound) {
      _M0FP414konnyakumatcha7moocast3cmd4main14restart__stage(id);
      return;
    } else {
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "")) {
        _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "stage", "stage-rebuild", "");
        return;
      } else {
        return;
      }
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main18schedule__recovery(channel, id, failed) {
  const index = _M0FP414konnyakumatcha7moocast3cmd4main11peer__index(channel, id);
  if (index < 0) {
    return undefined;
  }
  const peer = _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index);
  if (peer.recovery_scheduled) {
    return undefined;
  }
  peer.recovery_scheduled = true;
  _M0FP414konnyakumatcha7moocast3cmd4main16bridge__schedule(() => {
    peer.recovery_scheduled = false;
    _M0FP414konnyakumatcha7moocast3cmd4main13recover__peer(channel, id);
  }, failed ? 0 : 4000);
}
function _M0FP414konnyakumatcha7moocast3cmd4main16reconnect__media() {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
        _M0FP414konnyakumatcha7moocast3cmd4main14connect__voice(participant.id);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    _M0FP414konnyakumatcha7moocast3cmd4main17publish__topology();
  } else {
    if (_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing && _M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "")) {
      _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "stage", "stage-subscribe", "");
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
}
function _M0FP414konnyakumatcha7moocast3cmd4main14handle__signal(from, channel, kind, payload) {
  if (channel === "voice") {
    if (kind === "description") {
      _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer("voice", from, false);
      _M0FP414konnyakumatcha7moocast3cmd4main27bridge__handle__description("voice", from, payload, (success, answer) => {
        if (success && _M0IP016_24default__implPB2Eq10not__equalGsE(answer, "")) {
          _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(from, "voice", "description", answer);
          return;
        } else {
          return;
        }
      });
    } else {
      if (kind === "candidate") {
        if (_M0FP414konnyakumatcha7moocast3cmd4main9has__peer("voice", from)) {
          _M0FP414konnyakumatcha7moocast3cmd4main22bridge__add__candidate("voice", from, payload, (success) => {
          });
        }
      } else {
        if (kind === "control" && payload === "voice-ready") {
          if (_M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready && _M0IP016_24default__implPB7Compare6op__ltGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.client_id, from)) {
            _M0FP414konnyakumatcha7moocast3cmd4main11offer__peer("voice", from, false);
          }
        } else {
          if (kind === "control" && payload === "voice-restart") {
            _M0FP414konnyakumatcha7moocast3cmd4main14restart__voice(from);
          } else {
            if (kind === "member-state") {
              _M0FP414konnyakumatcha7moocast3cmd4main23set__participant__muted(from, payload === "muted");
            }
          }
        }
      }
    }
    return undefined;
  }
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(channel, "stage")) {
    return undefined;
  }
  if (kind === "description") {
    if (!_M0FP414konnyakumatcha7moocast3cmd4main9has__peer("stage", from)) {
      _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer("stage", from, false);
    }
    _M0FP414konnyakumatcha7moocast3cmd4main27bridge__handle__description("stage", from, payload, (success, answer) => {
      if (success && _M0IP016_24default__implPB2Eq10not__equalGsE(answer, "")) {
        _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(from, "stage", "description", answer);
        return;
      } else {
        return;
      }
    });
    return;
  } else {
    if (kind === "candidate") {
      if (_M0FP414konnyakumatcha7moocast3cmd4main9has__peer("stage", from)) {
        _M0FP414konnyakumatcha7moocast3cmd4main22bridge__add__candidate("stage", from, payload, (success) => {
        });
        return;
      } else {
        return;
      }
    } else {
      if (kind === "topology") {
        if (_M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "") && _M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, payload)) {
          _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "stage", "stage-release", "");
          _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("stage", _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent);
        }
        _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent = payload;
        if (_M0IP016_24default__implPB2Eq10not__equalGsE(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "")) {
          _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(_M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent, "stage", "stage-subscribe", "");
          return;
        } else {
          return;
        }
      } else {
        if (kind === "control" && payload === "stage-start") {
          _M0FP414konnyakumatcha7moocast3cmd4main12ensure__peer("stage", from, false);
          _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent = from;
          _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = true;
          _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
          _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
          return;
        } else {
          if (kind === "control" && payload === "stage-stop") {
            _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = false;
            _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent = "";
            _M0FP414konnyakumatcha7moocast3cmd4main14close__channel("stage");
            while (true) {
              if (_M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length > 0) {
                _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length - 1 | 0);
                continue;
              } else {
                break;
              }
            }
            _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", true);
            _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
            _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
            return;
          } else {
            if (kind === "control" && payload === "stage-subscribe") {
              if (!_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, from)) {
                _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, from);
              }
              if (_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
                _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(from);
                return;
              } else {
                return;
              }
            } else {
              if (kind === "control" && payload === "stage-rebuild") {
                _M0FP414konnyakumatcha7moocast3cmd4main14restart__stage(from);
                return;
              } else {
                if (kind === "control" && payload === "stage-release") {
                  if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, from)) {
                    const _bind = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length;
                    let _tmp = 0;
                    while (true) {
                      const child_index = _tmp;
                      if (child_index < _bind) {
                        const child = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children[child_index];
                        if (child === from) {
                          _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, child_index);
                          break;
                        }
                        _tmp = child_index + 1 | 0;
                        continue;
                      } else {
                        break;
                      }
                    }
                    _M0FP414konnyakumatcha7moocast3cmd4main11close__peer("stage", from);
                    return;
                  } else {
                    return;
                  }
                } else {
                  if (kind === "quality") {
                    if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main15stage__children, from)) {
                      _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__sender__quality("stage", from, payload);
                      return;
                    } else {
                      return;
                    }
                  } else {
                    return;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main13handle__event(event_type, first, second, third, fourth) {
  if (event_type === "participant") {
    _M0FP414konnyakumatcha7moocast3cmd4main16add__participant(first, second, third === "true");
    return;
  } else {
    if (event_type === "participant-left") {
      _M0FP414konnyakumatcha7moocast3cmd4main19remove__participant(first);
      _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
      return;
    } else {
      if (event_type === "signal") {
        _M0FP414konnyakumatcha7moocast3cmd4main14handle__signal(first, second, third, fourth);
        return;
      } else {
        if (event_type === "ice") {
          _M0FP414konnyakumatcha7moocast3cmd4main12send__signal(second, first, "candidate", third);
          return;
        } else {
          if (event_type === "state") {
            _M0FP414konnyakumatcha7moocast3cmd4main28set__participant__connection(first, second, third === "connected");
            if (third === "connected") {
              const index = _M0FP414konnyakumatcha7moocast3cmd4main11peer__index(first, second);
              if (index >= 0) {
                _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index).attempts = 0;
                _M0MPC15array5Array2atGRP414konnyakumatcha7moocast3cmd4main4PeerE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index).recovery_scheduled = false;
              }
            } else {
              if (third === "failed" || third === "disconnected") {
                _M0FP414konnyakumatcha7moocast3cmd4main18schedule__recovery(first, second, third === "failed");
              }
            }
            _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
            return;
          } else {
            if (event_type === "track") {
              if (first === "stage") {
                _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = true;
                _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", false);
                const _bind = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children.length;
                let _tmp = 0;
                while (true) {
                  const _ = _tmp;
                  if (_ < _bind) {
                    const child = _M0FP414konnyakumatcha7moocast3cmd4main15stage__children[_];
                    _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(child);
                    _tmp = _ + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
              }
              _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
              return;
            } else {
              if (event_type === "display-ended") {
                _M0FP414konnyakumatcha7moocast3cmd4main13stop__sharing();
                return;
              } else {
                if (event_type === "microphone-ended") {
                  _M0FP414konnyakumatcha7moocast3cmd4main5state.microphone_ready = false;
                  _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
                  return;
                } else {
                  if (event_type === "network") {
                    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("signal-status", first === "online" ? "信令已连接" : "信令重连中");
                    return;
                  } else {
                    if (event_type === "signal-error") {
                      _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", `WebRTC 协商异常：${first}`);
                      return;
                    } else {
                      if (event_type === "room-closed") {
                        _M0FP414konnyakumatcha7moocast3cmd4main5state.running = false;
                        _M0FP414konnyakumatcha7moocast3cmd4main13bridge__leave();
                        _M0FP414konnyakumatcha7moocast3cmd4main21bridge__stop__sharing();
                        _M0FP414konnyakumatcha7moocast3cmd4main24bridge__stop__microphone();
                        _M0FP414konnyakumatcha7moocast3cmd4main11clear__room();
                        _M0FP414konnyakumatcha7moocast3cmd4main5state.room_code = "";
                        _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id = "";
                        _M0FP414konnyakumatcha7moocast3cmd4main5state.host_id = "";
                        _M0FP414konnyakumatcha7moocast3cmd4main5state.stage_parent = "";
                        _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view("lobby");
                        _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", first);
                        _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", true);
                        _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", true);
                        return;
                      } else {
                        return;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main10on__create() {
  _M0FP414konnyakumatcha7moocast3cmd4main12create__room();
}
function _M0FP414konnyakumatcha7moocast3cmd4main8on__join() {
  _M0FP414konnyakumatcha7moocast3cmd4main10join__room();
}
function _M0FP414konnyakumatcha7moocast3cmd4main9on__start() {
  _M0FP414konnyakumatcha7moocast3cmd4main14start__sharing();
}
function _M0FP414konnyakumatcha7moocast3cmd4main8on__stop() {
  _M0FP414konnyakumatcha7moocast3cmd4main13stop__sharing();
}
function _M0FP414konnyakumatcha7moocast3cmd4main8on__mute() {
  _M0FP414konnyakumatcha7moocast3cmd4main18toggle__microphone();
}
function _M0FP414konnyakumatcha7moocast3cmd4main16on__stage__sound() {
  _M0FP414konnyakumatcha7moocast3cmd4main20toggle__stage__sound();
}
function _M0FP414konnyakumatcha7moocast3cmd4main11on__quality() {
  _M0FP414konnyakumatcha7moocast3cmd4main15change__quality();
}
function _M0FP414konnyakumatcha7moocast3cmd4main13on__reconnect() {
  _M0FP414konnyakumatcha7moocast3cmd4main16reconnect__media();
}
function _M0FP414konnyakumatcha7moocast3cmd4main9on__leave() {
  _M0FP414konnyakumatcha7moocast3cmd4main11leave__room();
}
(() => {
  _M0FP414konnyakumatcha7moocast3cmd4main18bridge__initialize(_M0FP414konnyakumatcha7moocast3cmd4main13handle__event);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("create-button", _M0FP414konnyakumatcha7moocast3cmd4main10on__create);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("join-button", _M0FP414konnyakumatcha7moocast3cmd4main8on__join);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("start-button", _M0FP414konnyakumatcha7moocast3cmd4main9on__start);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("stop-button", _M0FP414konnyakumatcha7moocast3cmd4main8on__stop);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("mute-button", _M0FP414konnyakumatcha7moocast3cmd4main8on__mute);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("stage-sound-button", _M0FP414konnyakumatcha7moocast3cmd4main16on__stage__sound);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("reconnect-button", _M0FP414konnyakumatcha7moocast3cmd4main13on__reconnect);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("leave-button", _M0FP414konnyakumatcha7moocast3cmd4main9on__leave);
  _M0FP414konnyakumatcha7moocast3cmd4main10on__change("quality-select", _M0FP414konnyakumatcha7moocast3cmd4main11on__quality);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("start-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("stop-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("mute-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("stage-sound-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("reconnect-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stop-button", false);
})();
//# sourceMappingURL=main.js.map
