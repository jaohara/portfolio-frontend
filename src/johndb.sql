/*
  johndb schema
  Created 7/14/2021

  This could probably stand to be renamed? This is a SQL file for the
  schema of the database that my portfolio site would use.

  It would need the following tables:

  - User 
    - to hold users (just myself, really)
  - Page (do I need this?)
    - stores body of each main page, written in markdown
    - Do I want to do it this way or write this stuff in my views?
  - BlogPost 
    - to hold blog posts
  - Project 
    - to hold portfolio projects
  - Scraps/Snippets 
    - could probably use a better name? To hold small things and demonstrations
 
*/


-- do I have a better name? Portfolio? Website?
DROP SCHEMA IF EXISTS johndb;
CREATE SCHEMA johndb;
USE johndb;

-- user table
CREATE TABLE User (
  user_id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name         VARCHAR(48) NOT NULL,
  email             VARCHAR(320) NOT NULL,
  first_name        VARCHAR(48),
  last_name         VARCHAR(48),
  created           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,   -- how do I use this exactly?
  password          VARCHAR(64) NOT NULL,          -- and what about this?

  PRIMARY KEY (user_id)
);

-- table for categories 
CREATE TABLE Category (
  category_name     VARCHAR(128) NOT NULL,
  category_id       INT UNSIGNED NOT NULL AUTO_INCREMENT,

  PRIMARY KEY (category_id)
);

-- table for blog posts
CREATE TABLE Post (
  post_id           INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  post_user_id      INT,          -- how do I relate these again? 
  title             VARCHAR(128) NOT NULL, -- does this work?
  published         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  body              TEXT NOT NULL, -- best type for this?

  PRIMARY KEY (post_id)
);


CREATE TABLE Project (
  project_id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_user_id   INT,
  published         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    
  title             VARCHAR(128) NOT NULL,
  is_scrap          BOOLEAN NOT NULL DEFAULT false, 
  description       TEXT NOT NULL,-- best type for this? I think it's TEXT or TINYTEXT?

  PRIMARY KEY (project_id)
);

-- many-to-many tables
CREATE TABLE PostCategory (
  post_id           INT UNSIGNED NOT NULL,
  category_id       INT UNSIGNED NOT NULL,

  CONSTRAINT postcategory_pk PRIMARY KEY (post_id, category_id),

  CONSTRAINT postcategory_post_id_fk FOREIGN KEY (post_id)
    REFERENCES Post (post_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT postcategory_category_id_fk FOREIGN KEY (category_id)
    REFERENCES Category (category_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE 
);

CREATE TABLE ProjectCategory (
  project_id        INT UNSIGNED NOT NULL,
  category_id       INT UNSIGNED NOT NULL,

  CONSTRAINT projectcategory_pk PRIMARY KEY (project_id, category_id),

  CONSTRAINT projectcategory_project_id_fk FOREIGN KEY (project_id)
    REFERENCES Project (project_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT projectcategory_category_id_fk FOREIGN KEY (category_id)
    REFERENCES Category (category_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE 
);
