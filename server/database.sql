CREATE DATABASE perntodo;

CREATE TABLE accounts (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    dateCreated timestamptz NOT NULL DEFAULT NOW(),
    profilePicture VARCHAR(512) NOT NULL,
    adminRole BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO accounts (firstName, lastName, email, password, profilePicture)
VALUES (alex, matamoros, passw0rd, alsdjfsfd);

CREATE TABLE posts(
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    authorId uuid NOT NULL,
    authorName VARCHAR(100) NOT NULL,
    title VARCHAR(75) NOT NULL,
    body text NOT NULL,
    dateCreated timestamptz NOT NULL DEFAULT NOW(),
    FOREIGN KEY (authorId) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE likes (
    accountId uuid NOT NULL,
    postId uuid NOT NULL,
    PRIMARY KEY (accountId, postId),
    FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tags (
    PRIMARY KEY (tagName, postId),
    tagName VARCHAR(75) NOT NULL,
    postId uuid NOT NULL,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- query most common tags
SELECT count(tagname), tagname FROM tags GROUP BY tagname ORDER BY count(tagname) DESC LIMIT 5;


-- query posts with selected tag
SELECT *
FROM tags t
INNER JOIN posts p on t.postId = p.id
WHERE t.tagName = 'machine-learning' ORDER BY title ASC LIMIT 5 OFFSET 0;