DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(255),
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_date TIMESTAMP,
  completed_date TIMESTAMP

);
