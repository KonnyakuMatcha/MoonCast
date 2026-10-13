///|
extern "js" fn bridge_initialize(
  callback : (String, String, String, String, String) -> Unit,
) -> Unit =
  #| (callback) => MoonCastBridge.initialize(callback)

///|
extern "js" fn bridge_get_name() -> String =
  #| () => MoonCastBridge.getName()

///|
extern "js" fn bridge_get_join_code() -> String =
  #| () => MoonCastBridge.getJoinCode()

///|
extern "js" fn bridge_get_quality() -> String =
  #| () => document.getElementById("quality-select").value

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
  channel : String,
  signal_type : String,
  payload : String,
) -> Unit =
  #| (recipient, channel, signalType, payload) => MoonCastBridge.sendSignal(recipient, channel, signalType, payload)

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
extern "js" fn bridge_set_button_text(id : String, text : String) -> Unit =
  #| (id, text) => MoonCastBridge.setText(id, text)

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
  voice_connected : Bool,
  stage_connected : Bool,
  muted : Bool,
) -> Unit =
  #| (id, name, isHost, voiceConnected, stageConnected, muted) => MoonCastBridge.addParticipant(id, name, isHost, voiceConnected, stageConnected, muted)

///|
extern "js" fn bridge_update_participant(
  id : String,
  voice_connected : Bool,
  stage_connected : Bool,
  muted : Bool,
) -> Unit =
  #| (id, voiceConnected, stageConnected, muted) => MoonCastBridge.updateParticipant(id, voiceConnected, stageConnected, muted)

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
extern "js" fn bridge_start_microphone(
  callback : (Bool, String) -> Unit,
) -> Unit =
  #| (callback) => MoonCastBridge.startMicrophone(callback)

///|
extern "js" fn bridge_stop_microphone() -> Unit =
  #| () => MoonCastBridge.stopMicrophone()

///|
extern "js" fn bridge_set_microphone_enabled(enabled : Bool) -> Unit =
  #| (enabled) => MoonCastBridge.setMicrophoneEnabled(enabled)

///|
extern "js" fn bridge_set_stage_sound_enabled(enabled : Bool) -> Unit =
  #| (enabled) => MoonCastBridge.setStageSoundEnabled(enabled)

///|
extern "js" fn bridge_create_peer(
  channel : String,
  id : String,
  is_sender : Bool,
) -> Unit =
  #| (channel, id, isSender) => MoonCastBridge.createPeer(channel, id, isSender)

///|
extern "js" fn bridge_create_offer(
  channel : String,
  id : String,
  ice_restart : Bool,
  callback : (Bool, String) -> Unit,
) -> Unit =
  #| (channel, id, iceRestart, callback) => MoonCastBridge.createOffer(channel, id, iceRestart, callback)

///|
extern "js" fn bridge_handle_description(
  channel : String,
  id : String,
  description : String,
  callback : (Bool, String) -> Unit,
) -> Unit =
  #| (channel, id, description, callback) => MoonCastBridge.handleDescription(channel, id, description, callback)

///|
extern "js" fn bridge_add_candidate(
  channel : String,
  id : String,
  candidate : String,
  callback : (Bool) -> Unit,
) -> Unit =
  #| (channel, id, candidate, callback) => MoonCastBridge.addCandidate(channel, id, candidate, callback)

///|
extern "js" fn bridge_close_peer(channel : String, id : String) -> Unit =
  #| (channel, id) => MoonCastBridge.closePeer(channel, id)

///|
extern "js" fn bridge_set_sender_quality(
  channel : String,
  id : String,
  quality : String,
) -> Unit =
  #| (channel, id, quality) => MoonCastBridge.setSenderQuality(channel, id, quality)

///|
extern "js" fn bridge_schedule(callback : () -> Unit, delay : Int32) -> Unit =
  #| (callback, delay) => MoonCastBridge.schedule(callback, delay)

///|
struct Participant {
  id : String
  mut voice_connected : Bool
  mut stage_connected : Bool
  mut muted : Bool
}

///|
struct Peer {
  id : String
  channel : String
  outbound : Bool
  mut attempts : Int32
  mut recovery_scheduled : Bool
}

///|
struct AppState {
  mut room_code : String
  mut client_id : String
  mut host_id : String
  mut sharing : Bool
  mut running : Bool
  mut microphone_ready : Bool
  mut microphone_muted : Bool
  mut shared_sound_enabled : Bool
  mut quality : String
  mut stage_parent : String
}

///|
let state : AppState = AppState::{
  room_code: "",
  client_id: "",
  host_id: "",
  sharing: false,
  running: false,
  microphone_ready: false,
  microphone_muted: false,
  shared_sound_enabled: true,
  quality: "high",
  stage_parent: "",
}

///|
let participants : Array[Participant] = []

///|
let peers : Array[Peer] = []

///|
let stage_children : Array[String] = []

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
fn participant_index(id : String) -> Int32 {
  for index, participant in participants {
    if participant.id == id {
      return index
    }
  }
  -1
}

///|
fn peer_index(channel : String, id : String) -> Int32 {
  for index, peer in peers {
    if peer.channel == channel && peer.id == id {
      return index
    }
  }
  -1
}

///|
fn has_peer(channel : String, id : String) -> Bool {
  peer_index(channel, id) >= 0
}

///|
fn ensure_peer(channel : String, id : String, outbound : Bool) -> Unit {
  if has_peer(channel, id) {
    return
  }
  peers.push(Peer::{
    id,
    channel,
    outbound,
    attempts: 0,
    recovery_scheduled: false,
  })
  bridge_create_peer(channel, id, outbound)
}

///|
fn close_peer(channel : String, id : String) -> Unit {
  let index = peer_index(channel, id)
  if index >= 0 {
    ignore(peers.remove(index))
  }
  bridge_close_peer(channel, id)
}

///|
fn close_channel(channel : String) -> Unit {
  let mut index = peers.length() - 1
  while index >= 0 {
    if peers[index].channel == channel {
      close_peer(channel, peers[index].id)
    }
    index = index - 1
  }
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
  participants.push(Participant::{
    id,
    voice_connected: false,
    stage_connected: false,
    muted: false,
  })
  bridge_add_participant(id, name, participant_is_host, false, false, false)
  if id != state.client_id {
    connect_voice(id)
  }
  if is_host() && state.sharing {
    publish_topology()
  }
}

///|
fn remove_participant(id : String) -> Unit {
  let index = participant_index(id)
  if index >= 0 {
    ignore(participants.remove(index))
  }
  close_peer("voice", id)
  close_peer("stage", id)
  if stage_children.contains(id) {
    for child_index, child in stage_children {
      if child == id {
        ignore(stage_children.remove(child_index))
        break
      }
    }
  }
  bridge_remove_participant(id)
  if is_host() && state.sharing {
    publish_topology()
  }
}

///|
fn clear_room() -> Unit {
  while participants.length() > 0 {
    ignore(participants.remove(participants.length() - 1))
  }
  while peers.length() > 0 {
    close_peer(peers[peers.length() - 1].channel, peers[peers.length() - 1].id)
  }
  while stage_children.length() > 0 {
    ignore(stage_children.remove(stage_children.length() - 1))
  }
  bridge_clear_participants()
}

///|
fn set_participant_connection(
  channel : String,
  id : String,
  connected : Bool,
) -> Unit {
  for participant in participants {
    if participant.id == id {
      if channel == "voice" {
        participant.voice_connected = connected
      } else {
        participant.stage_connected = connected
      }
      bridge_update_participant(
        id,
        participant.voice_connected,
        participant.stage_connected,
        participant.muted,
      )
    }
  }
}

///|
fn set_participant_muted(id : String, muted : Bool) -> Unit {
  for participant in participants {
    if participant.id == id {
      participant.muted = muted
      bridge_update_participant(
        id,
        participant.voice_connected,
        participant.stage_connected,
        muted,
      )
    }
  }
}

///|
fn update_room_status() -> Unit {
  if !state.running {
    return
  }
  let mut voice_connected = 0
  let mut stage_connected = 0
  for participant in participants {
    if participant.id == state.client_id {
      continue
    }
    if participant.voice_connected {
      voice_connected = voice_connected + 1
    }
    if participant.stage_connected {
      stage_connected = stage_connected + 1
    }
  }
  let total = participants.length() - 1
  bridge_set_text(
    "voice-status",
    if state.microphone_ready {
      "语音 " +
      voice_connected.to_string() +
      "/" +
      total.to_string() +
      " 已连接"
    } else {
      "等待麦克风权限"
    },
  )
  if is_host() {
    bridge_set_text(
      "stage-status",
      if state.sharing {
        "画面 " +
        stage_connected.to_string() +
        "/" +
        total.to_string() +
        " 已连接 · 浅层树"
      } else {
        "尚未共享屏幕"
      },
    )
  } else {
    bridge_set_text(
      "stage-status",
      if state.sharing {
        "正在接收画面 · " + state.quality
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
  bridge_set_button_enabled(
    "mute-button",
    state.running && state.microphone_ready,
  )
  bridge_set_button_enabled(
    "stage-sound-button",
    state.running && state.sharing,
  )
  bridge_set_button_enabled("reconnect-button", state.running)
  bridge_show_element("start-button", is_host())
  bridge_show_element("stop-button", is_host() && state.sharing)
  bridge_show_element("stage-sound-button", !is_host() && state.sharing)
  bridge_set_button_text(
    "mute-button",
    if state.microphone_muted {
      "取消静音"
    } else {
      "静音麦克风"
    },
  )
  bridge_set_button_text(
    "stage-sound-button",
    if state.shared_sound_enabled {
      "关闭共享声音"
    } else {
      "开启共享声音"
    },
  )
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
  bridge_start_microphone(fn(success : Bool, error : String) {
    state.microphone_ready = success
    if success {
      for participant in participants {
        if participant.id != state.client_id {
          connect_voice(participant.id)
        }
      }
    } else {
      bridge_set_text("voice-status", "麦克风不可用：" + error)
    }
    update_controls()
    update_room_status()
  })
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
fn send_signal(
  recipient : String,
  channel : String,
  signal_type : String,
  payload : String,
) -> Unit {
  bridge_send_signal(recipient, channel, signal_type, payload)
}

///|
fn offer_peer(channel : String, id : String, ice_restart : Bool) -> Unit {
  bridge_create_offer(channel, id, ice_restart, fn(
    success : Bool,
    description : String,
  ) {
    if success {
      send_signal(id, channel, "description", description)
    }
  })
}

///|
fn connect_voice(id : String) -> Unit {
  if !state.running || id == state.client_id {
    return
  }
  ensure_peer("voice", id, false)
  if !state.microphone_ready {
    return
  }
  if state.client_id < id {
    offer_peer("voice", id, false)
  } else {
    send_signal(id, "voice", "voice-ready", "")
  }
}

///|
fn restart_voice(id : String) -> Unit {
  close_peer("voice", id)
  ensure_peer("voice", id, false)
  offer_peer("voice", id, false)
}

///|
fn start_stage_for(id : String) -> Unit {
  ensure_peer("stage", id, true)
  offer_peer("stage", id, false)
}

///|
fn restart_stage(id : String) -> Unit {
  close_peer("stage", id)
  start_stage_for(id)
}

///|
fn publish_topology() -> Unit {
  if !is_host() || !state.sharing {
    return
  }
  let ids : Array[String] = []
  for participant in participants {
    if participant.id != state.client_id {
      ids.push(participant.id)
    }
  }
  let plan = @topology.plan_stage_topology(ids, 3)
  let direct_children : Array[String] = []
  for assignment in plan {
    send_signal(assignment.0, "stage", "stage-topology", assignment.1)
    if assignment.1 == "host" {
      direct_children.push(assignment.0)
    }
  }
  let stale_stage_children : Array[String] = []
  for peer in peers {
    if peer.channel == "stage" &&
      peer.outbound &&
      !direct_children.contains(peer.id) {
      stale_stage_children.push(peer.id)
    }
  }
  for child in stale_stage_children {
    close_peer("stage", child)
  }
  let previous_children : Array[String] = []
  for child in stage_children {
    if !direct_children.contains(child) {
      previous_children.push(child)
    }
  }
  while stage_children.length() > 0 {
    ignore(stage_children.remove(stage_children.length() - 1))
  }
  for child in direct_children {
    stage_children.push(child)
    start_stage_for(child)
  }
  for child in previous_children {
    send_signal(child, "stage", "stage-release", "")
  }
  update_room_status()
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
    publish_topology()
  })
}

///|
fn stop_sharing() -> Unit {
  if !state.sharing {
    return
  }
  state.sharing = false
  state.stage_parent = ""
  bridge_stop_sharing()
  for participant in participants {
    if participant.id != state.client_id {
      send_signal(participant.id, "stage", "stage-stop", "")
    }
  }
  close_channel("stage")
  while stage_children.length() > 0 {
    ignore(stage_children.remove(stage_children.length() - 1))
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
  bridge_stop_microphone()
  bridge_leave()
  clear_room()
  state.room_code = ""
  state.client_id = ""
  state.host_id = ""
  state.stage_parent = ""
  state.microphone_ready = false
  state.microphone_muted = false
  bridge_set_view("lobby")
  bridge_set_text("lobby-status", "已离开房间")
  bridge_set_button_enabled("create-button", true)
  bridge_set_button_enabled("join-button", true)
}

///|
fn broadcast_member_state() -> Unit {
  for participant in participants {
    if participant.id != state.client_id {
      send_signal(
        participant.id,
        "voice",
        "member-state",
        if state.microphone_muted {
          "muted"
        } else {
          "unmuted"
        },
      )
    }
  }
}

///|
fn toggle_microphone() -> Unit {
  state.microphone_muted = !state.microphone_muted
  bridge_set_microphone_enabled(!state.microphone_muted)
  broadcast_member_state()
  update_controls()
}

///|
fn toggle_stage_sound() -> Unit {
  state.shared_sound_enabled = !state.shared_sound_enabled
  bridge_set_stage_sound_enabled(state.shared_sound_enabled)
  update_controls()
}

///|
fn change_quality() -> Unit {
  state.quality = bridge_get_quality()
  if !is_host() && state.sharing && state.stage_parent != "" {
    send_signal(state.stage_parent, "stage", "stage-quality", state.quality)
  }
  update_room_status()
}

///|
fn recover_peer(channel : String, id : String) -> Unit {
  let index = peer_index(channel, id)
  if index < 0 {
    return
  }
  let peer = peers[index]
  if peer.attempts >= 3 {
    bridge_set_text(
      "stage-status",
      if channel == "voice" {
        "部分语音连接未恢复"
      } else {
        "部分画面连接未恢复"
      },
    )
    return
  }
  peer.attempts = peer.attempts + 1
  if channel == "voice" {
    if state.client_id < id {
      restart_voice(id)
    } else {
      send_signal(id, "voice", "voice-restart", "")
    }
  } else if peer.outbound {
    restart_stage(id)
  } else if state.stage_parent != "" {
    send_signal(state.stage_parent, "stage", "stage-rebuild", "")
  }
}

///|
fn schedule_recovery(channel : String, id : String, failed : Bool) -> Unit {
  let index = peer_index(channel, id)
  if index < 0 {
    return
  }
  let peer = peers[index]
  if peer.recovery_scheduled {
    return
  }
  peer.recovery_scheduled = true
  bridge_schedule(
    fn() {
      peer.recovery_scheduled = false
      recover_peer(channel, id)
    },
    if failed {
      0
    } else {
      4000
    },
  )
}

///|
fn reconnect_media() -> Unit {
  for participant in participants {
    if participant.id != state.client_id {
      connect_voice(participant.id)
    }
  }
  if is_host() && state.sharing {
    publish_topology()
  } else if state.sharing && state.stage_parent != "" {
    send_signal(state.stage_parent, "stage", "stage-subscribe", "")
  }
  update_room_status()
}

///|
fn handle_signal(
  from : String,
  channel : String,
  kind : String,
  payload : String,
) -> Unit {
  if channel == "voice" {
    if kind == "description" {
      ensure_peer("voice", from, false)
      bridge_handle_description("voice", from, payload, fn(
        success : Bool,
        answer : String,
      ) {
        if success && answer != "" {
          send_signal(from, "voice", "description", answer)
        }
      })
    } else if kind == "candidate" {
      if has_peer("voice", from) {
        bridge_add_candidate("voice", from, payload, fn(success : Bool) {
          ignore(success)
        })
      }
    } else if kind == "control" && payload == "voice-ready" {
      if state.microphone_ready && state.client_id < from {
        offer_peer("voice", from, false)
      }
    } else if kind == "control" && payload == "voice-restart" {
      restart_voice(from)
    } else if kind == "member-state" {
      set_participant_muted(from, payload == "muted")
    }
    return
  }
  if channel != "stage" {
    return
  }
  if kind == "description" {
    if !has_peer("stage", from) {
      ensure_peer("stage", from, false)
    }
    bridge_handle_description("stage", from, payload, fn(
      success : Bool,
      answer : String,
    ) {
      if success && answer != "" {
        send_signal(from, "stage", "description", answer)
      }
    })
  } else if kind == "candidate" {
    if has_peer("stage", from) {
      bridge_add_candidate("stage", from, payload, fn(success : Bool) {
        ignore(success)
      })
    }
  } else if kind == "topology" {
    if state.stage_parent != "" && state.stage_parent != payload {
      send_signal(state.stage_parent, "stage", "stage-release", "")
      close_peer("stage", state.stage_parent)
    }
    state.stage_parent = payload
    if state.stage_parent != "" {
      send_signal(state.stage_parent, "stage", "stage-subscribe", "")
    }
  } else if kind == "control" && payload == "stage-start" {
    ensure_peer("stage", from, false)
    state.stage_parent = from
    state.sharing = true
    update_controls()
    update_room_status()
  } else if kind == "control" && payload == "stage-stop" {
    state.sharing = false
    state.stage_parent = ""
    close_channel("stage")
    while stage_children.length() > 0 {
      ignore(stage_children.remove(stage_children.length() - 1))
    }
    bridge_show_element("stage-placeholder", true)
    update_controls()
    update_room_status()
  } else if kind == "control" && payload == "stage-subscribe" {
    if !stage_children.contains(from) {
      stage_children.push(from)
    }
    if state.sharing {
      start_stage_for(from)
    }
  } else if kind == "control" && payload == "stage-rebuild" {
    restart_stage(from)
  } else if kind == "control" && payload == "stage-release" {
    if stage_children.contains(from) {
      for child_index, child in stage_children {
        if child == from {
          ignore(stage_children.remove(child_index))
          break
        }
      }
      close_peer("stage", from)
    }
  } else if kind == "quality" {
    if stage_children.contains(from) {
      bridge_set_sender_quality("stage", from, payload)
    }
  }
}

///|
fn handle_event(
  event_type : String,
  first : String,
  second : String,
  third : String,
  fourth : String,
) -> Unit {
  if event_type == "participant" {
    add_participant(first, second, third == "true")
  } else if event_type == "participant-left" {
    remove_participant(first)
    update_room_status()
  } else if event_type == "signal" {
    handle_signal(first, second, third, fourth)
  } else if event_type == "ice" {
    send_signal(second, first, "candidate", third)
  } else if event_type == "state" {
    set_participant_connection(first, second, third == "connected")
    if third == "connected" {
      let index = peer_index(first, second)
      if index >= 0 {
        peers[index].attempts = 0
        peers[index].recovery_scheduled = false
      }
    } else if third == "failed" || third == "disconnected" {
      schedule_recovery(first, second, third == "failed")
    }
    update_room_status()
  } else if event_type == "track" {
    if first == "stage" {
      state.sharing = true
      bridge_show_element("stage-placeholder", false)
      for child in stage_children {
        start_stage_for(child)
      }
    }
    update_room_status()
  } else if event_type == "display-ended" {
    stop_sharing()
  } else if event_type == "microphone-ended" {
    state.microphone_ready = false
    update_controls()
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
    bridge_stop_microphone()
    clear_room()
    state.room_code = ""
    state.client_id = ""
    state.host_id = ""
    state.stage_parent = ""
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
fn on_mute() -> Unit {
  toggle_microphone()
}

///|
fn on_stage_sound() -> Unit {
  toggle_stage_sound()
}

///|
fn on_quality() -> Unit {
  change_quality()
}

///|
fn on_reconnect() -> Unit {
  reconnect_media()
}

///|
fn on_leave() -> Unit {
  leave_room()
}

///|
extern "js" fn on_click(id : String, handler : () -> Unit) -> Unit =
  #| (id, handler) => document.getElementById(id).addEventListener("click", handler)

///|
extern "js" fn on_change(id : String, handler : () -> Unit) -> Unit =
  #| (id, handler) => document.getElementById(id).addEventListener("change", handler)

///|
fn main {
  bridge_initialize(handle_event)
  on_click("create-button", on_create)
  on_click("join-button", on_join)
  on_click("start-button", on_start)
  on_click("stop-button", on_stop)
  on_click("mute-button", on_mute)
  on_click("stage-sound-button", on_stage_sound)
  on_click("reconnect-button", on_reconnect)
  on_click("leave-button", on_leave)
  on_change("quality-select", on_quality)
  bridge_set_button_enabled("start-button", false)
  bridge_set_button_enabled("stop-button", false)
  bridge_set_button_enabled("mute-button", false)
  bridge_set_button_enabled("stage-sound-button", false)
  bridge_set_button_enabled("reconnect-button", false)
  bridge_show_element("stop-button", false)
}
