-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS project_two;
-- Creates the "blogger" database --
CREATE DATABASE project_two;

USE project_two;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NULL,
  email VARCHAR(100) NULL,
  PRIMARY KEY (id)
);