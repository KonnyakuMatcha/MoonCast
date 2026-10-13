///|
test "empty rooms produce no stage links" {
  let plan = plan_stage_topology([], 3)
  assert_eq(plan.length(), 0)
}

///|
test "nonpositive relay limits fall back to direct host links" {
  let plan = plan_stage_topology(["a", "b", "c"], 0)
  assert_eq(plan.length(), 3)
  assert_eq(plan[0], ("a", "host"))
  assert_eq(plan[1], ("b", "host"))
  assert_eq(plan[2], ("c", "host"))
}

///|
test "small rooms stay directly connected to the host" {
  let plan = plan_stage_topology(["a", "b", "c"], 3)
  assert_eq(plan.length(), 3)
  assert_eq(plan[0], ("a", "host"))
  assert_eq(plan[1], ("b", "host"))
  assert_eq(plan[2], ("c", "host"))
}

///|
test "large rooms use one shallow relay level" {
  let plan = plan_stage_topology(["a", "b", "c", "d", "e", "f", "g"], 3)
  assert_eq(plan.length(), 7)
  assert_eq(plan[0], ("a", "host"))
  assert_eq(plan[1], ("b", "host"))
  assert_eq(plan[2], ("c", "host"))
  assert_eq(plan[3], ("d", "a"))
  assert_eq(plan[4], ("e", "b"))
  assert_eq(plan[5], ("f", "c"))
  assert_eq(plan[6], ("g", "a"))
}
