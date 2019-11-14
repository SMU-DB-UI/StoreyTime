USE `ballotBuddy`;

CREATE TABLE IF NOT EXISTS `users` 
    (`id` INT(10) AUTO_INCREMENT, 
    `firstName` varchar(50), 
    `lastName` varchar(50), 
    `email` varchar(100), 
    `pass` varchar(255), 
    `salt` varchar(16),
    `user_type` TINYINT, 
    `state_residence` CHAR, 
    `date_joined` DATE,
    `inactive` TINYINT,
    PRIMARY KEY(`id`) );
-- tag1_following INT(10),
-- profile_pic IMAGE,
-- minio for picture storage?

-- use bridge for tags!
CREATE TABLE IF NOT EXISTS `tags_users_bridge`
    ( `users_id` INT(10),
    `tag_id` INT(10),
    PRIMARY KEY(`users_id`, `tag_id`),
    FOREIGN KEY(`users_id`) REFERENCES `users`(`id`),
    FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`) );


CREATE TABLE IF NOT EXISTS `tags` 
    (`tag_id` INT(10) AUTO_INCREMENT, 
    `tag_word` VARCHAR(50), 
    PRIMARY KEY(`tag_id`) );

CREATE TABLE IF NOT EXISTS `posts` 
    (`post_id` INT(10) AUTO_INCREMENT, 
    `creator_id` INT(10), 
    `tag_id1` INT(10), 
    `tag_id2` INT(10), 
    `tag_id3` INT(10), 
    `date_created` DATE, 
    `title` VARCHAR(100), 
    `post_text` VARCHAR(280), 
    PRIMARY KEY(`post_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );

CREATE TABLE IF NOT EXISTS `polls` 
    (`poll_id` INT(10),  
    `creator_id` INT(10), 
    `question` VARCHAR(150),  
    `answer1` VARCHAR(50), 
    `answer2` VARCHAR(50), 
    `count_answer1` INT, 
    `count_answer2` INT, 
    `date_created` DATE,
    PRIMARY KEY(`poll_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );

CREATE TABLE IF NOT EXISTS `groups` 
    (`group_id` INT(10), 
    `creator_id` INT(10), 
    `group_name` VARCHAR(20), 
    PRIMARY KEY(`group_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );

 -- bridge for members of group
CREATE TABLE IF NOT EXISTS `group_members_bridge`
    (`group_id` INT(10),
    `member_id` INT(10),
    PRIMARY KEY(`group_id`, `member_id`),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`),
    FOREIGN KEY(`member_id`) REFERENCES `users`(`id`) );

CREATE TABLE IF NOT EXISTS `events`
    (`event_id` INT(10), 
    `group_id` INT(10), 
    `date_created` DATE, 
    `event_date` DATE, 
    `event_desc` VARCHAR(200),
    PRIMARY KEY(`event_id`),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`) );

CREATE TABLE IF NOT EXISTS `comments`
    (`comment_id` INT(10), 
    `creator_id` INT(10), 
    `post_id` INT(10), 
    `comment_text` VARCHAR(280), 
    `date_created` DATE,
    PRIMARY KEY(`comment_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`),
    FOREIGN KEY(`post_id`) REFERENCES `posts`(`post_id`) );

CREATE TABLE IF NOT EXISTS `announcements`
    (`announcement_id` INT(10) PRIMARY KEY, 
    `creator_id` INT(10), 
    `group_id` INT(10), 
    `announcement_text` VARCHAR(280), 
    `date_created` DATE, 
    PRIMARY KEY(`announcement_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`),
    FOREIGN KEY(`group_id`) REFERENCES groups(`group_id`) );
