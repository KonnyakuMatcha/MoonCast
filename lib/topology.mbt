///|
pub fn plan_stage_topology(
  participant_ids : Array[String],
  max_children : Int32,
) -> Array[(String, String)] {
  let assignments : Array[(String, String)] = []
  if participant_ids.length() == 0 {
    return assignments
  }
  if max_children <= 0 || participant_ids.length() <= max_children {
    for participant_id in participant_ids {
      assignments.push((participant_id, "host"))
    }
    return assignments
  }
  let relays : Array[String] = []
  for index, participant_id in participant_ids {
    if index < max_children {
      relays.push(participant_id)
      assignments.push((participant_id, "host"))
    }
  }
  let mut relay_index = 0
  for index, participant_id in participant_ids {
    if index >= max_children {
      assignments.push((participant_id, relays[relay_index]))
      relay_index = (relay_index + 1) % relays.length()
    }
  }
  assignments
}
