function _M0TP414konnyakumatcha7moocast3cmd4main8AppState(param0, param1, param2, param3, param4) {
  this.room_code = param0;
  this.client_id = param1;
  this.host_id = param2;
  this.sharing = param3;
  this.running = param4;
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
const _M0MPB7JSArray6splice = (arr, idx, cnt) => arr.splice(idx, cnt);
const _M0FP414konnyakumatcha7moocast3cmd4main18bridge__initialize = (callback) => MoonCastBridge.initialize(callback);
const _M0FP414konnyakumatcha7moocast3cmd4main17bridge__get__name = () => MoonCastBridge.getName();
const _M0FP414konnyakumatcha7moocast3cmd4main23bridge__get__join__code = () => MoonCastBridge.getJoinCode();
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__room = (name, callback) => MoonCastBridge.createRoom(name, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main18bridge__join__room = (code, name, callback) => MoonCastBridge.joinRoom(code, name, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal = (recipient, signalType, payload) => MoonCastBridge.sendSignal(recipient, signalType, payload);
const _M0FP414konnyakumatcha7moocast3cmd4main13bridge__leave = () => MoonCastBridge.leave();
const _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text = (id, text) => MoonCastBridge.setText(id, text);
const _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled = (id, enabled) => MoonCastBridge.setButtonEnabled(id, enabled);
const _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element = (id, visible) => MoonCastBridge.showElement(id, visible);
const _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view = (view) => MoonCastBridge.setView(view);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__clear__participants = () => MoonCastBridge.clearParticipants();
const _M0FP414konnyakumatcha7moocast3cmd4main24bridge__add__participant = (id, name, isHost, connected) => MoonCastBridge.addParticipant(id, name, isHost, connected);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__update__participant = (id, connected) => MoonCastBridge.updateParticipant(id, connected);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__remove__participant = (id) => MoonCastBridge.removeParticipant(id);
const _M0FP414konnyakumatcha7moocast3cmd4main22bridge__start__sharing = (callback) => MoonCastBridge.startSharing(callback);
const _M0FP414konnyakumatcha7moocast3cmd4main21bridge__stop__sharing = () => MoonCastBridge.stopSharing();
const _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__peer = (id, isHost) => MoonCastBridge.createPeer(id, isHost);
const _M0FP414konnyakumatcha7moocast3cmd4main21bridge__create__offer = (id, callback) => MoonCastBridge.createOffer(id, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main27bridge__handle__description = (id, description, callback) => MoonCastBridge.handleDescription(id, description, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main22bridge__add__candidate = (id, candidate, callback) => MoonCastBridge.addCandidate(id, candidate, callback);
const _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer = (id) => MoonCastBridge.closePeer(id);
function _M0TP414konnyakumatcha7moocast3cmd4main11Participant(param0, param1) {
  this.id = param0;
  this.connected = param1;
}
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
const _M0FP414konnyakumatcha7moocast3cmd4main9on__click = (id, handler) => document.getElementById(id).addEventListener("click", handler);
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0FP414konnyakumatcha7moocast3cmd4main5state = new _M0TP414konnyakumatcha7moocast3cmd4main8AppState("", "", "", false, false);
const _M0FP414konnyakumatcha7moocast3cmd4main12participants = [];
const _M0FP414konnyakumatcha7moocast3cmd4main5peers = [];
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
function _M0IP016_24default__implPB2Eq10not__equalGsE(x, y) {
  return !(x === y);
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
function _M0MPC15array5Array2atGsE(self, index) {
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
function _M0FP414konnyakumatcha7moocast3cmd4main16add__participant(id, name, participant_is_host) {
  if (id === "" || _M0FP414konnyakumatcha7moocast3cmd4main16has__participant(id)) {
    return undefined;
  }
  _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main12participants, new _M0TP414konnyakumatcha7moocast3cmd4main11Participant(id, false));
  _M0FP414konnyakumatcha7moocast3cmd4main24bridge__add__participant(id, name, participant_is_host, false);
}
function _M0FP414konnyakumatcha7moocast3cmd4main19remove__participant(id) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const index = _tmp;
    if (index < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[index];
      if (participant.id === id) {
        _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main12participants, index);
        break;
      }
      _tmp = index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, id)) {
    _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer(id);
    const _bind$2 = _M0FP414konnyakumatcha7moocast3cmd4main5peers.length;
    let _tmp$2 = 0;
    while (true) {
      const index = _tmp$2;
      if (index < _bind$2) {
        const peer = _M0FP414konnyakumatcha7moocast3cmd4main5peers[index];
        if (peer === id) {
          _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index);
          break;
        }
        _tmp$2 = index + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main27bridge__remove__participant(id);
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
      _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer(_M0MPC15array5Array2atGsE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, _M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0));
      _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, _M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0);
      continue;
    } else {
      break;
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main27bridge__clear__participants();
}
function _M0FP414konnyakumatcha7moocast3cmd4main28set__participant__connection(id, connected) {
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (participant.id === id) {
        participant.connected = connected;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP414konnyakumatcha7moocast3cmd4main27bridge__update__participant(id, connected);
}
function _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status() {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.running) {
    return undefined;
  }
  const connected = new _M0TPB8MutLocalGiE(0);
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id) && participant.connected) {
        connected.val = connected.val + 1 | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (_M0FP414konnyakumatcha7moocast3cmd4main8is__host()) {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing ? (connected.val > 0 ? `共享中 · 已连接 ${_M0MPC13int3Int18to__string_2einner(connected.val, 10)} 位观众` : "共享中 · 等待观众连接") : "尚未共享屏幕");
    return;
  } else {
    _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("stage-status", _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing ? "正在接收房主共享" : "等待房主共享屏幕");
    return;
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main16update__controls() {
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("start-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running && (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && !_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing));
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("stop-button", _M0FP414konnyakumatcha7moocast3cmd4main5state.running && (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing));
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("start-button", _M0FP414konnyakumatcha7moocast3cmd4main8is__host());
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stop-button", _M0FP414konnyakumatcha7moocast3cmd4main8is__host() && _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing);
}
function _M0FP414konnyakumatcha7moocast3cmd4main11enter__room() {
  _M0FP414konnyakumatcha7moocast3cmd4main5state.running = true;
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view("room");
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("room-code", `房间 ${_M0FP414konnyakumatcha7moocast3cmd4main5state.room_code}`);
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("signal-status", "信令已连接");
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", true);
  _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
  _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
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
function _M0FP414konnyakumatcha7moocast3cmd4main19ensure__stage__peer(id, peer_is_host) {
  if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, id)) {
    return undefined;
  }
  _M0MPC15array5Array4pushGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, id);
  _M0FP414konnyakumatcha7moocast3cmd4main20bridge__create__peer(id, peer_is_host);
}
function _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(id) {
  _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal(id, "stage-start", "");
  _M0FP414konnyakumatcha7moocast3cmd4main19ensure__stage__peer(id, true);
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__create__offer(id, (success, description) => {
    if (success) {
      _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal(id, "description", description);
      return;
    } else {
      return;
    }
  });
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
    const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
        if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
          _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(participant.id);
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  });
}
function _M0FP414konnyakumatcha7moocast3cmd4main13stop__sharing() {
  if (!_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing) {
    return undefined;
  }
  _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = false;
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__stop__sharing();
  const _bind = _M0FP414konnyakumatcha7moocast3cmd4main12participants.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const participant = _M0FP414konnyakumatcha7moocast3cmd4main12participants[_];
      if (_M0IP016_24default__implPB2Eq10not__equalGsE(participant.id, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id)) {
        _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal(participant.id, "stage-stop", "");
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (_M0FP414konnyakumatcha7moocast3cmd4main5peers.length > 0) {
      _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer(_M0MPC15array5Array2atGsE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, _M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0));
      _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, _M0FP414konnyakumatcha7moocast3cmd4main5peers.length - 1 | 0);
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
  _M0FP414konnyakumatcha7moocast3cmd4main13bridge__leave();
  _M0FP414konnyakumatcha7moocast3cmd4main11clear__room();
  _M0FP414konnyakumatcha7moocast3cmd4main5state.room_code = "";
  _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id = "";
  _M0FP414konnyakumatcha7moocast3cmd4main5state.host_id = "";
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__view("lobby");
  _M0FP414konnyakumatcha7moocast3cmd4main17bridge__set__text("lobby-status", "已离开房间");
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("create-button", true);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("join-button", true);
}
function _M0FP414konnyakumatcha7moocast3cmd4main14handle__signal(from, kind, payload) {
  if (kind === "control") {
    if (payload === "stage-start") {
      _M0FP414konnyakumatcha7moocast3cmd4main19ensure__stage__peer(from, false);
      _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = true;
      _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
      _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
    } else {
      if (payload === "stage-stop") {
        if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, from)) {
          _M0FP414konnyakumatcha7moocast3cmd4main19bridge__close__peer(from);
          const _bind = _M0FP414konnyakumatcha7moocast3cmd4main5peers.length;
          let _tmp = 0;
          while (true) {
            const index = _tmp;
            if (index < _bind) {
              const peer = _M0FP414konnyakumatcha7moocast3cmd4main5peers[index];
              if (peer === from) {
                _M0MPC15array5Array6removeGRP414konnyakumatcha7moocast3cmd4main11ParticipantE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, index);
                break;
              }
              _tmp = index + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        }
        _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = false;
        _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", true);
        _M0FP414konnyakumatcha7moocast3cmd4main16update__controls();
        _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
      }
    }
    return undefined;
  }
  if (kind === "description") {
    _M0FP414konnyakumatcha7moocast3cmd4main19ensure__stage__peer(from, false);
    _M0FP414konnyakumatcha7moocast3cmd4main27bridge__handle__description(from, payload, (success, answer) => {
      if (success && _M0IP016_24default__implPB2Eq10not__equalGsE(answer, "")) {
        _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal(from, "description", answer);
        return;
      } else {
        return;
      }
    });
    return;
  } else {
    if (kind === "candidate") {
      if (_M0MPC15array5Array8containsGsE(_M0FP414konnyakumatcha7moocast3cmd4main5peers, from)) {
        _M0FP414konnyakumatcha7moocast3cmd4main22bridge__add__candidate(from, payload, (success) => {
        });
        return;
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
function _M0FP414konnyakumatcha7moocast3cmd4main13handle__event(event_type, first, second, third) {
  if (event_type === "participant") {
    _M0FP414konnyakumatcha7moocast3cmd4main16add__participant(first, second, third === "true");
    if (_M0FP414konnyakumatcha7moocast3cmd4main8is__host() && (_M0FP414konnyakumatcha7moocast3cmd4main5state.sharing && _M0IP016_24default__implPB2Eq10not__equalGsE(first, _M0FP414konnyakumatcha7moocast3cmd4main5state.client_id))) {
      _M0FP414konnyakumatcha7moocast3cmd4main17start__stage__for(first);
      return;
    } else {
      return;
    }
  } else {
    if (event_type === "participant-left") {
      _M0FP414konnyakumatcha7moocast3cmd4main19remove__participant(first);
      _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
      return;
    } else {
      if (event_type === "signal") {
        _M0FP414konnyakumatcha7moocast3cmd4main14handle__signal(first, second, third);
        return;
      } else {
        if (event_type === "ice") {
          _M0FP414konnyakumatcha7moocast3cmd4main20bridge__send__signal(first, "candidate", second);
          return;
        } else {
          if (event_type === "state") {
            _M0FP414konnyakumatcha7moocast3cmd4main28set__participant__connection(first, second === "connected");
            _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
            return;
          } else {
            if (event_type === "track") {
              _M0FP414konnyakumatcha7moocast3cmd4main5state.sharing = true;
              _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stage-placeholder", false);
              _M0FP414konnyakumatcha7moocast3cmd4main20update__room__status();
              return;
            } else {
              if (event_type === "display-ended") {
                _M0FP414konnyakumatcha7moocast3cmd4main13stop__sharing();
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
                      _M0FP414konnyakumatcha7moocast3cmd4main11clear__room();
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
function _M0FP414konnyakumatcha7moocast3cmd4main9on__leave() {
  _M0FP414konnyakumatcha7moocast3cmd4main11leave__room();
}
(() => {
  _M0FP414konnyakumatcha7moocast3cmd4main18bridge__initialize(_M0FP414konnyakumatcha7moocast3cmd4main13handle__event);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("create-button", _M0FP414konnyakumatcha7moocast3cmd4main10on__create);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("join-button", _M0FP414konnyakumatcha7moocast3cmd4main8on__join);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("start-button", _M0FP414konnyakumatcha7moocast3cmd4main9on__start);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("stop-button", _M0FP414konnyakumatcha7moocast3cmd4main8on__stop);
  _M0FP414konnyakumatcha7moocast3cmd4main9on__click("leave-button", _M0FP414konnyakumatcha7moocast3cmd4main9on__leave);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("start-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main28bridge__set__button__enabled("stop-button", false);
  _M0FP414konnyakumatcha7moocast3cmd4main21bridge__show__element("stop-button", false);
})();
//# sourceMappingURL=main.js.map
