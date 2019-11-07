CREATE DATABASE ballotBuddy;
USE ballotBuddy;

CREATE TABLE IF NOT EXISTS users (id INT(10) AUTO_INCREMENT, firstName varchar(50), lastName varchar(50), email varchar(100), password varchar(255), PRIMARY KEY(id, email));

CREATE TABLE IF NOT EXISTS profiles (id INT(10) AUTO_INCREMENT PRIMARY KEY, fullName varchar(100), state char(2), user_type int(1), tags_following int(10), profile_pic BLOB, date_joined DATE, ACTIVE tinyint(1), FOREIGN KEY(id));

CREATE TABLE IF NOT EXISTS tags (tag_id INT(10), tag_word VARCHAR(50));

CREATE TABLE IF NOT EXISTS posts (post_id INT(10), creator_id INT(10), tag_combination , ///// ??

CREATE TABLE IF NOT EXISTS tagged_lists ( tag_combination INT(10), id_1 INT(10), id_2 INT(10), id_3 INT(10), id_4 INT(10), id_5 INT(10), id_6 INT(10), id_7 INT(10), id_8 INT(10), id_9 INT(10)); //make this work w tags ?

CREATE TABLE IF NOT EXISTS polls (poll_id INT(10), creator_id INT(10), tag_combination , 

CREATE TABLE IF NOT EXISTS groups ();
 
 /* still to create: political groups, events, comments, announcements --- go over this and finish in lab */