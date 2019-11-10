CREATE DATABASE ballotBuddy;
USE ballotBuddy;

CREATE TABLE IF NOT EXISTS users (id INT(10) AUTO_INCREMENT, firstName varchar(50), lastName varchar(50), email varchar(100), pass varchar(255), user_type TINYINT(1), state CHAR(2), PRIMARY KEY(id, email));

CREATE TABLE IF NOT EXISTS profiles (id INT(10) AUTO_INCREMENT PRIMARY KEY, fullName varchar(100), state char(2), user_type int(1), tags_following int(10), profile_pic BLOB, date_joined DATE, ACTIVE tinyint(1), FOREIGN KEY(id));

CREATE TABLE IF NOT EXISTS tags (tag_id INT(10) PRIMARY KEY, tag_word VARCHAR(50));

CREATE TABLE IF NOT EXISTS posts (post_id INT(10) PRIMARY KEY, creator_id INT(10), tag_id1 INT(10), tag_id2 INT(10), tag_id3 INT(10), date_created DATE, title VARCHAR(100), post_text VARCHAR(280));

CREATE TABLE IF NOT EXISTS polls (poll_id INT(10) PRIMARY KEY, creator_id INT(10), question VARCHAR(150),  answer1 VARCHAR(50), answer2 VARCHAR(50), count_answer1 INT, count_answer2 INT, date_created DATE);

CREATE TABLE IF NOT EXISTS groups (group_id INT(10), creator_id INT(10), member_count INT(5), );

CREATE TABLE IF NOT EXISTS events (event_id INT(10) PRIMARY KEY, group_id INT(10), date_created DATE, event_date DATE, event_desc VARCHAR(200));

CREATE TABLE IF NOT EXISTS comments (comment_id INT(10) PRIMARY KEY, creator_id INT(10), post_id INT(10), comment_text VARCHAR(280), date_created DATE);

CREATE TABLE IF NOT EXISTS announcements (announcement_id INT(10) PRIMARY KEY, creator_id INT(10), group_id INT(10), announcement_text VARCHAR(280), date_created DATE);

 /* still to create: announcements --- go over this and finish in lab */