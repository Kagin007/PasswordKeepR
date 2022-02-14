-- Users table seeds here (Example)
INSERT INTO users (name, email, password)
VALUES ('Alice', 'alice@g.com', '123');

INSERT INTO users (name, email, password)
VALUES ('Kira', 'kira@g.com', '123');

INSERT INTO todos (user_id, category, description, completed, created_date, completed_date)
VALUES (1, 'restaurants', 'kfc', true, '2002-12-31', '2003-10-31');

INSERT INTO todos (user_id, category, description, completed, created_date, completed_date)
VALUES (1, 'movie/tv', 'harry potter', false, '2000-11-12', null );

