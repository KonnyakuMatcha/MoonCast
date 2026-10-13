///|
extern "js" fn bridge_initialize(
  callback : (String, String, String, String) -> Unit,
) -> Unit =
  #| (callback) => MoonCastBridge.initialize(callback)

///|
extern "js" fn bridge_get_name() -> String =
  #| () => MoonCastBridge.getName()

///|
extern "js" fn bridge_get_join_code() -> String =
  #| () => MoonCastBridge.getJoinCode()

///|
extern "js" fn bridge_create_room(
  name : String,
  callback : (String, String, String, String) -> Unit,
) -> Unit =
  #| (name, callback) => MoonCastBridge.createRoom(name, callback)

///|
extern "js" fn bridge_join_room(
  code : String,
  name : String,
  callback : (String, String, String, String, String) -> Unit,
) -> Unit =
  #| (code, name, callback) => MoonCastBridge.joinRoom(code, name, callback)

///|
extern "js" fn bridge_send_signal(
  recipient : String,
  signal_type : String,
  payload : String,
) -> Unit =
  #| (recipient, signalType, payload) => MoonCastBridge.sendSignal(recipient, signalType, payload)

///|
extern "js" fn bridge_leave() -> Unit =
  #| () => MoonCastBridge.leave()

///|
extern "js" fn bridge_set_text(id : String, text : String) -> Unit =
  #| (id, text) => MoonCastBridge.setText(id, text)

///|
extern "js" fn bridge_set_button_enabled(id : String, enabled : Bool) -> Unit =
  #| (id, enabled) => MoonCastBridge.setButtonEnabled(id, enabled)

///|
extern "js" fn bridge_show_element(id : String, visible : Bool) -> Unit =
  #| (id, visible) => MoonCastBridge.showElement(id, visible)

///|
extern "js" fn bridge_set_view(view : String) -> Unit =
  #| (view) => MoonCastBridge.setView(view)

///|
extern "js" fn bridge_clear_participants() -> Unit =
  #| () => MoonCastBridge.clearParticipants()

///|
extern "js" fn bridge_add_participant(
  id : String,
  name : String,
  is_host : Bool,
  connected : Bool,
) -> Unit =
  #| (id, name, isHost, connected) => MoonCastBridge.addParticipant(id, name, isHost, connected)

///|
extern "js" fn bridge_update_participant(id : String, connected : Bool) -> Unit =
  #| (id, connected) => MoonCastBridge.updateParticipant(id, connected)

///|
extern "js" fn bridge_remove_participant(id : String) -> Unit =
  #| (id) => MoonCastBridge.removeParticipant(id)

///|
extern "js" fn bridge_start_sharing(
  callback : (Bool, Bool, String) -> Unit,
) -> Unit =
  #| (callback) => MoonCastBridge.startSharing(callback)

///|
extern "js" fn bridge_stop_sharing() -> Unit =
  #| () => MoonCastBridge.stopSharing()

///|
extern "js" fn bridge_create_peer(id : String, is_host : Bool) -> Unit =
  #| (id, isHost) => MoonCastBridge.createPeer(id, isHost)

///|
extern "js" fn bridge_create_offer(
  id : String,
  callback : (Bool, String) -> Unit,
) -> Unit =
  #| (id, callback) => MoonCastBridge.createOffer(id, callback)

///|
extern "js" fn bridge_handle_description(
  id : String,
  description : String,
  callback : (Bool, String) -> Unit,
) -> Unit =
  #| (id, description, callback) => MoonCastBridge.handleDescription(id, description, callback)

///|
extern "js" fn bridge_add_candidate(
  id : String,
  candidate : String,
  callback : (Bool) -> Unit,
) -> Unit =
  #| (id, candidate, callback) => MoonCastBridge.addCandidate(id, candidate, callback)

///|
extern "js" fn bridge_close_peer(id : String) -> Unit =
  #| (id) => MoonCastBridge.closePeer(id)

///|
struct Participant {
  id : String
  mut connected : Bool
}

///|
struct AppState {
  mut room_code : String
  mut client_id : String
  mut host_id : String
  mut sharing : Bool
  mut running : Bool
}

///|
let state : AppState = AppState::{
  room_code: "",
  client_id: "",
  host_id: "",
  sharing: false,
  running: false,
}

///|
let participants : Array[Participant] = []

///|
let peers : Array[String] = []

///|
fn is_host() -> Bool {
  state.client_id == state.host_id && state.host_id != ""
}

///|
fn has_participant(id : String) -> Bool {
  for participant in participants {
    if participant.id == id {
      return true
    }
  }
  false
}

///|
fn add_participant(
  id : String,
  name : String,
  participant_is_host : Bool,
) -> Unit {
  if id == "" || has_participant(id) {
    return
  }
  participants.push(Participant::{ id, connected: false, })
  bridge_add_participant(id, name, participant_is_host, false)
}

///|
fn remove_participant(id : String) -> Unit {
  for index, participant in participants {
    if participant.id == id {
      ignore(participants.remove(index))
      break
    }
  }
  if peers.contains(id) {
    bridge_close_peer(id)
    for index, peer in peers {
      if peer == id {
        ignore(peers.remove(index))
        break
      }
    }
  }
  bridge_remove_participant(id)
}

///|
fn clear_room() -> Unit {
  while participants.length() > 0 {
    ignore(participants.remove(participants.length() - 1))
  }
  while peers.length() > 0 {
    bridge_close_peer(peers[peers.length() - 1])
    ignore(peers.remove(peers.length() - 1))
  }
  bridge_clear_participants()
}

///|
fn set_participant_connection(id : String, connected : Bool) -> Unit {
  for participant in participants {
    if participant.id == id {
      participant.connected = connected
    }
  }
  bridge_update_participant(id, connected)
}

///|
fn update_room_status() -> Unit {
  if !state.running {
    return
  }
  let mut connected = 0
  for participant in participants {
    if participant.id != state.client_id && participant.connected {
      connected = connected + 1
    }
  }
  if is_host() {
    bridge_set_text(
      "stage-status",
      if state.sharing {
        if connected > 0 {
          "共享中 · 已连接 " + connected.to_string() + " 位观众"
        } else {
          "共享中 · 等待观众连接"
        }
      } else {
        "尚未共享屏幕"
      },
    )
  } else {
    bridge_set_text(
      "stage-status",
      if state.sharing {
        "正在接收房主共享"
      } else {
        "等待房主共享屏幕"
      },
    )
  }
}

///|
fn update_controls() -> Unit {
  bridge_set_button_enabled(
    "start-button",
    state.running && is_host() && !state.sharing,
  )
  bridge_set_button_enabled(
    "stop-button",
    state.running && is_host() && state.sharing,
  )
  bridge_show_element("start-button", is_host())
  bridge_show_element("stop-button", is_host() && state.sharing)
}

///|
fn enter_room() -> Unit {
  state.running = true
  bridge_set_view("room")
  bridge_set_text("room-code", "房间 " + state.room_code)
  bridge_set_text("signal-status", "信令已连接")
  bridge_show_element("stage-placeholder", true)
  update_controls()
  update_room_status()
}

///|
fn create_room() -> Unit {
  let name = bridge_get_name()
  if name == "" {
    bridge_set_text("lobby-status", "请输入昵称")
    return
  }
  bridge_set_button_enabled("create-button", false)
  bridge_set_button_enabled("join-button", false)
  bridge_create_room(name, fn(
    error : String,
    room_code : String,
    client_id : String,
    _token : String,
  ) {
    if error != "" {
      bridge_set_text("lobby-status", error)
      bridge_set_button_enabled("create-button", true)
      bridge_set_button_enabled("join-button", true)
      return
    }
    state.room_code = room_code
    state.client_id = client_id
    state.host_id = client_id
    enter_room()
  })
}

///|
fn join_room() -> Unit {
  let name = bridge_get_name()
  let code = bridge_get_join_code()
  if name == "" {
    bridge_set_text("lobby-status", "请输入昵称")
    return
  }
  if code.length() != 6 {
    bridge_set_text("lobby-status", "请输入 6 位房间码")
    return
  }
  bridge_set_button_enabled("create-button", false)
  bridge_set_button_enabled("join-button", false)
  bridge_join_room(code, name, fn(
    error : String,
    room_code : String,
    client_id : String,
    _token : String,
    host_id : String,
  ) {
    if error != "" {
      bridge_set_text("lobby-status", error)
      bridge_set_button_enabled("create-button", true)
      bridge_set_button_enabled("join-button", true)
      return
    }
    state.room_code = room_code
    state.client_id = client_id
    state.host_id = host_id
    enter_room()
  })
}

///|
fn ensure_stage_peer(id : String, peer_is_host : Bool) -> Unit {
  if peers.contains(id) {
    return
  }
  peers.push(id)
  bridge_create_peer(id, peer_is_host)
}

///|
fn start_stage_for(id : String) -> Unit {
  bridge_send_signal(id, "stage-start", "")
  ensure_stage_peer(id, true)
  bridge_create_offer(id, fn(success : Bool, description : String) {
    if success {
      bridge_send_signal(id, "description", description)
    }
  })
}

///|
fn start_sharing() -> Unit {
  bridge_set_button_enabled("start-button", false)
  bridge_start_sharing(fn(success : Bool, has_audio : Bool, error : String) {
    if !success {
      bridge_set_text("stage-status", error)
      update_controls()
      return
    }
    state.sharing = true
    bridge_show_element("stage-placeholder", false)
    update_controls()
    bridge_set_text(
      "stage-status",
      if has_audio {
        "共享中 · 已包含来源声音"
      } else {
        "共享中 · 来源未提供声音"
      },
    )
    for participant in participants {
      if participant.id != state.client_id {
        start_stage_for(participant.id)
      }
    }
  })
}

///|
fn stop_sharing() -> Unit {
  if !state.sharing {
    return
  }
  state.sharing = false
  bridge_stop_sharing()
  for participant in participants {
    if participant.id != state.client_id {
      bridge_send_signal(participant.id, "stage-stop", "")
    }
  }
  while peers.length() > 0 {
    bridge_close_peer(peers[peers.length() - 1])
    ignore(peers.remove(peers.length() - 1))
  }
  bridge_show_element("stage-placeholder", true)
  update_controls()
  update_room_status()
}

///|
fn leave_room() -> Unit {
  if !state.running {
    return
  }
  state.running = false
  if state.sharing {
    bridge_stop_sharing()
  }
  state.sharing = false
  bridge_leave()
  clear_room()
  state.room_code = ""
  state.client_id = ""
  state.host_id = ""
  bridge_set_view("lobby")
  bridge_set_text("lobby-status", "已离开房间")
  bridge_set_button_enabled("create-button", true)
  bridge_set_button_enabled("join-button", true)
}

///|
fn handle_signal(from : String, kind : String, payload : String) -> Unit {
  if kind == "control" {
    if payload == "stage-start" {
      ensure_stage_peer(from, false)
      state.sharing = true
      update_controls()
      update_room_status()
    } else if payload == "stage-stop" {
      if peers.contains(from) {
        bridge_close_peer(from)
        for index, peer in peers {
          if peer == from {
            ignore(peers.remove(index))
            break
          }
        }
      }
      state.sharing = false
      bridge_show_element("stage-placeholder", true)
      update_controls()
      update_room_status()
    }
    return
  }
  if kind == "description" {
    ensure_stage_peer(from, false)
    bridge_handle_description(from, payload, fn(
      success : Bool,
      answer : String,
    ) {
      if success && answer != "" {
        bridge_send_signal(from, "description", answer)
      }
    })
  } else if kind == "candidate" {
    if peers.contains(from) {
      bridge_add_candidate(from, payload, fn(success : Bool) { ignore(success) })
    }
  }
}

///|
fn handle_event(
  event_type : String,
  first : String,
  second : String,
  third : String,
) -> Unit {
  if event_type == "participant" {
    add_participant(first, second, third == "true")
    if is_host() && state.sharing && first != state.client_id {
      start_stage_for(first)
    }
  } else if event_type == "participant-left" {
    remove_participant(first)
    update_room_status()
  } else if event_type == "signal" {
    handle_signal(first, second, third)
  } else if event_type == "ice" {
    bridge_send_signal(first, "candidate", second)
  } else if event_type == "state" {
    set_participant_connection(first, second == "connected")
    update_room_status()
  } else if event_type == "track" {
    state.sharing = true
    bridge_show_element("stage-placeholder", false)
    update_room_status()
  } else if event_type == "display-ended" {
    stop_sharing()
  } else if event_type == "network" {
    bridge_set_text(
      "signal-status",
      if first == "online" {
        "信令已连接"
      } else {
        "信令重连中"
      },
    )
  } else if event_type == "signal-error" {
    bridge_set_text("stage-status", "WebRTC 协商异常：" + first)
  } else if event_type == "room-closed" {
    state.running = false
    bridge_leave()
    bridge_stop_sharing()
    clear_room()
    bridge_set_view("lobby")
    bridge_set_text("lobby-status", first)
    bridge_set_button_enabled("create-button", true)
    bridge_set_button_enabled("join-button", true)
  }
}

///|
fn on_create() -> Unit {
  create_room()
}

///|
fn on_join() -> Unit {
  join_room()
}

///|
fn on_start() -> Unit {
  start_sharing()
}

///|
fn on_stop() -> Unit {
  stop_sharing()
}

///|
fn on_leave() -> Unit {
  leave_room()
}

///|
extern "js" fn on_click(id : String, handler : () -> Unit) -> Unit =
  #| (id, handler) => document.getElementById(id).addEventListener("click", handler)

///|
fn main {
  bridge_initialize(handle_event)
  on_click("create-button", on_create)
  on_click("join-button", on_join)
  on_click("start-button", on_start)
  on_click("stop-button", on_stop)
  on_click("leave-button", on_leave)
  bridge_set_button_enabled("start-button", false)
  bridge_set_button_enabled("stop-button", false)
  bridge_show_element("stop-button", false)
}
