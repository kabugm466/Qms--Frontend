// The backend stores access levels as 'view_only' | 'manage_appointments' | 'full_access'
// (see backend/src/db/migrations/005_create_institution_staff.sql), but the existing
// frontend components (src/utils/permissions.js, StaffManagement.jsx) were written
// against the Title Case labels shown in the UI. Rather than touch every component,
// this maps at the API boundary so both sides stay as they are.

export const ACCESS_LEVEL_TO_LABEL = {
  view_only: 'View Only',
  manage_appointments: 'Manage Appointments',
  full_access: 'Full Access',
};

export const ACCESS_LEVEL_TO_VALUE = {
  'View Only': 'view_only',
  'Manage Appointments': 'manage_appointments',
  'Full Access': 'full_access',
};

export function accessLevelToLabel(value) {
  return ACCESS_LEVEL_TO_LABEL[value] || value;
}

export function accessLevelToValue(label) {
  return ACCESS_LEVEL_TO_VALUE[label] || label;
}
