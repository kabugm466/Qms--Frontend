// Central permission helper for staff access-level gating.
// "View Only"          → can navigate + view, zero actions
// "Manage Appointments"→ can Approve / Reject / Reschedule / Call Next on their assigned service
// "Full Access"        → same as Manage Appointments, broader scope (multiple services)

export function canManage(accessLevel) {
  return accessLevel === "Manage Appointments" || accessLevel === "Full Access";
}

export function canEditProfile(accessLevel) {
  return accessLevel === "Full Access";
}
