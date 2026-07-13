CREATE TABLE IF NOT EXISTS appointments (
  id              SERIAL PRIMARY KEY,
  client_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution_id  INTEGER NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  service_id      INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  staff_id        INTEGER REFERENCES users(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  queue_number    INTEGER,
  status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled', 'completed')),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_institution_id ON appointments(institution_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date_status ON appointments(appointment_date, status);
