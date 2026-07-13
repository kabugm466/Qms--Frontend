CREATE TABLE IF NOT EXISTS institutions (
  id            SERIAL PRIMARY KEY,
  owner_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name          VARCHAR(150) NOT NULL,
  category      VARCHAR(80),
  description   TEXT,
  address       VARCHAR(255),
  phone         VARCHAR(30),
  email         VARCHAR(150),
  logo_url      TEXT,
  status        VARCHAR(20) NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'active', 'suspended')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_institutions_owner_id ON institutions(owner_id);
CREATE INDEX IF NOT EXISTS idx_institutions_status ON institutions(status);
