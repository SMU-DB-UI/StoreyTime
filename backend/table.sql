
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT(10) AUTO_INCREMENT,
    `firstName` VARCHAR(50),
    `lastName` VARCHAR(50),
    `email` VARCHAR(100),
    `pass` VARCHAR(255),
    `salt` VARCHAR(16),
    `user_type` TINYINT,
    `state_residence` CHAR(2),
    `date_joined` DATE,
    `inactive` TINYINT,
    PRIMARY KEY(`id`) 
);

CREATE TABLE IF NOT EXISTS `tags` (
    `tag_id` INT(10) AUTO_INCREMENT,
    `tag_word` VARCHAR(50),
    PRIMARY KEY(`tag_id`) 
);

CREATE TABLE IF NOT EXISTS `tags_users_bridge` (
    `tag_id` INT(10),
    `user_id` INT(10),
    PRIMARY KEY(`tag_id`, `user_id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`), 
    FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`)
);

CREATE TABLE IF NOT EXISTS `posts` (
    `post_id` INT(10) AUTO_INCREMENT,
    `creator_id` INT(10),
    `title` VARCHAR(100),
    `post_text` VARCHAR(300),
    `date_created` DATETIME,
    `inactive` TINYINT,
    PRIMARY KEY(`post_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) 
);

CREATE TABLE IF NOT EXISTS `comments` (
    `comment_id` INT(10) AUTO_INCREMENT,
    `creator_id` INT(10),
    `post_id` INT(10),
    `comment_text` VARCHAR(300),
    `date_created` DATETIME,
    `inactive` TINYINT,
    PRIMARY KEY(`comment_id`),
    FOREIGN KEY(`post_id`) REFERENCES `posts`(`post_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) 
);

CREATE TABLE IF NOT EXISTS `polls` (
    `poll_id` INT(10) AUTO_INCREMENT,
    `creator_id` INT(10),
    `question` VARCHAR(150),
    `date_created` DATETIME,
    `inactive` TINYINT,
    PRIMARY KEY(`poll_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) 
);

CREATE TABLE IF NOT EXISTS `polls_answers` (
    `poll_id` INT(10),
    `answer_text` VARCHAR(150),
    `answer_count` INT,
    PRIMARY KEY(`poll_id`, `answer_text`),
    FOREIGN KEY(`poll_id`) REFERENCES `polls`(`poll_id`)
);

CREATE TABLE IF NOT EXISTS `tags_posts` (
    `tag_id` INT(10),
    `post_id` INT(10),
    PRIMARY KEY(`tag_id`, `post_id`),
    FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`),
    FOREIGN KEY(`post_id`) REFERENCES `posts`(`post_id`)
);

CREATE TABLE IF NOT EXISTS `tags_polls` (
    `tag_id` INT(10),
    `poll_id` INT(10),
    PRIMARY KEY(`tag_id`, `poll_id`),
    FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`),
    FOREIGN KEY(`poll_id`) REFERENCES `polls`(`poll_id`)
);

CREATE TABLE IF NOT EXISTS `groups` (
    `group_id` INT(10) AUTO_INCREMENT, 
    `creator_id` INT(10), 
    `group_name` VARCHAR(20), 
    `inactive` TINYINT,
    PRIMARY KEY(`group_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) 
);

CREATE TABLE IF NOT EXISTS `events` (
    `event_id` INT(10) AUTO_INCREMENT,
    `creator_id` INT(10),
    `group_id` INT(10),
    `date_created` DATETIME,
    `event_date` DATETIME,
    `event_desc` VARCHAR(200),
    `inactive` TINYINT,
    PRIMARY KEY(`event_id`),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `groups_admins` (
    `group_id` INT(10),
    `admin_id` INT(10),
    `current` TINYINT,
    `date_added` DATE,
    PRIMARY KEY(`group_id`, `admin_id`),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`),
    FOREIGN KEY(`admin_id`) REFERENCES `users`(`id`) 
);

CREATE TABLE IF NOT EXISTS `announcement` (
    `announcement_id` INT(10) AUTO_INCREMENT,
    `creator_id` INT(10),
    `group_id` INT(10),
    `announcement_text` VARCHAR(300),
    `date_created` DATETIME,
    `inactive` TINYINT,
    PRIMARY KEY(`announcement_id`),
    FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`)
);

CREATE TABLE IF NOT EXISTS `politicians` (
    `user_id` INT(10),
    `politician_type` VARCHAR(50),
    `office_phone` INT(11),
    `office_email` VARCHAR(50),
    PRIMARY KEY(`user_id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `groups_members_bridge` (
    `group_id` INT(10),
    `member_id` INT(10),
    `inactive` TINYINT,
    PRIMARY KEY(`group_id`, `member_id`),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`),
    FOREIGN KEY(`member_id`) REFERENCES `users`(`id`)
);