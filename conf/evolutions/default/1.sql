# --- !Ups
CREATE TABLE rest_requests (
    id INTEGER PRIMARY KEY,
    username TEXT,
    path TEXT NOT NULL,
    method TEXT NOT NULL,
    body TEXT NOT NULL,
    md5 TEXT NOT NULL,
    created_at INTEGER
);

CREATE INDEX username_idx ON rest_requests(username);

CREATE UNIQUE INDEX md5_idx ON rest_requests(md5);

# --- !Downs
DROP TABLE rest_requests;
