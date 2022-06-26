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