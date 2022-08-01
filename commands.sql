CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER NOT NULL  DEFAULT 0
);
INSERT INTO blogs (url, title) VALUES ('www.blog.com', 'Best Title');
INSERT INTO blogs (author, url, title) VALUES ('John Doe', 'www.doe.com', 'Doe Blog');

