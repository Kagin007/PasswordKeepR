DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

GRANT ALL PRIVILEGES ON TABLE users TO labber;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(255),
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_date TIMESTAMP,
  completed_date TIMESTAMP

);

GRANT ALL PRIVILEGES ON TABLE todos TO labber;
