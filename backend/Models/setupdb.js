'use strict';

var connection = require('./db.js');
var db = function(db)
{
    
}

db.setupDB = function(result)
{
    connection.query("CREATE TABLE IF NOT EXISTS `users` (`id` INT(10) AUTO_INCREMENT, `firstName` varchar(50), `lastName` varchar(50), `email` varchar(100), `pass` varchar(255), `salt` varchar(16),`user_type` TINYINT, `state_residence` CHAR(2), `date_joined` DATE,`inactive` TINYINT, PRIMARY KEY(`id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `tags` (`tag_id` INT(10) AUTO_INCREMENT, `tag_word` VARCHAR(50), PRIMARY KEY(`tag_id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `tags_users_bridge`( `users_id` INT(10),`tag_id` INT(10),PRIMARY KEY(`users_id`, `tag_id`),FOREIGN KEY(`users_id`) REFERENCES `users`(`id`),FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `posts` (`post_id` INT(10) AUTO_INCREMENT, `creator_id` INT(10),`date_created` DATETIME, `title` VARCHAR(100), `post_text` VARCHAR(300), `inactive` TINYINT(1), PRIMARY KEY(`post_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `groups` (`group_id` INT(10) AUTO_INCREMENT, `creator_id` INT(10), `group_name` VARCHAR(20), `inactive` TINYINT(1), PRIMARY KEY(`group_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `comments`(`comment_id` INT(10) AUTO_INCREMENT, `creator_id` INT(10), `post_id` INT(10), `comment_text` VARCHAR(300), `date_created` DATETIME, `inactive` TINYINT(1), PRIMARY KEY(`comment_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`), FOREIGN KEY(`post_id`) REFERENCES `posts`(`post_id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `events`(`event_id` INT(10) AUTO_INCREMENT, `group_id` INT(10), `creator_id` INT(10), `date_created` DATETIME, `event_date` DATETIME, `event_desc` VARCHAR(200), `inactive` TINYINT(1), PRIMARY KEY(`event_id`), FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`), FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `polls` (`poll_id` INT(10) AUTO_INCREMENT,  `creator_id` INT(10), `question` VARCHAR(150), `date_created` DATETIME, `inactive` TINYINT(1), PRIMARY KEY(`poll_id`), FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `group_members_bridge`(`group_id` INT(10),`member_id` INT(10), `inactive` TINYINT(1), PRIMARY KEY(`group_id`, `member_id`),FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`), FOREIGN KEY(`member_id`) REFERENCES `users`(`id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `polls_answers`(`poll_id` INT(10), `answer_text` VARCHAR(150), `answer_count` INT, PRIMARY KEY(`poll_id`, `answer_text`), FOREIGN KEY(`poll_id`) REFERENCES `polls`(`poll_id`));");
    connection.query("CREATE TABLE IF NOT EXISTS `tags_posts`(`tag_id` INT(10), `post_id` INT(10), PRIMARY KEY(`tag_id`, `post_id`), FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`), FOREIGN KEY(`post_id`) REFERENCES `posts`(`post_id`));");
    connection.query("CREATE TABLE IF NOT EXISTS `tags_polls`(`tag_id` INT(10), `poll_id` INT(10), PRIMARY KEY(`tag_id`, `poll_id`), FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`), FOREIGN KEY(`poll_id`) REFERENCES `polls`(`poll_id`));");
    connection.query("CREATE TABLE IF NOT EXISTS `groups_admins`(`group_id` INT(10), `admin_id` INT(10), `current` TINYINT, `date_added` DATE, PRIMARY KEY(`group_id`, `admin_id`), FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`), FOREIGN KEY(`admin_id`) REFERENCES `users`(`id`) );")
    connection.query("CREATE TABLE IF NOT EXISTS `announcements`(`announcement_id` INT(10) AUTO_INCREMENT, `creator_id` INT(10), `group_id` INT(10), `announcement_text` VARCHAR(300), `date_created` DATETIME, `inactive` TINYINT(1), PRIMARY KEY(`announcement_id`), FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`), FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`) );");
    connection.query("CREATE TABLE IF NOT EXISTS `politicians`(`user_id` INT(10), `politician_type` VARCHAR(50), `office_phone` INT(11), `office_email` VARCHAR(50), PRIMARY KEY(`user_id`), FOREIGN KEY(`user_id`) REFERENCES `users`(`id`));");
    connection.query("CREATE TABLE IF NOT EXISTS `groups_members_bridge`(`group_id` INT(10), `member_id` INT(10), `inactive` TINYINT, PRIMARY KEY(`group_id`, `member_id`), FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`), FOREIGN KEY(`member_id`) REFERENCES `users`(`id`));"); 

    result(null, {"code":200});
};

db.insertInfo = function(result)
{
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'republican' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'conservative' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'democrat' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'liberal' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'immigration' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'abortion' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'climate change' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'gun control' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'unemployment' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'education' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'religion' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'drug policy' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'patriot act' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'net neutrality' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'social security' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'equal pay' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'taxes' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'welfare' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'medicaid' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'vaccinations' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'terrorism' + "');");
    connection.query("INSERT INTO `ballotBuddy`.`tags` (tag_word) VALUES ('" + 'racism' + "');");
    result(null, {"code": 200});

};

// db.setupUsers = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `users` (`id` INT(10) AUTO_INCREMENT, `firstName` varchar(50), `lastName` varchar(50), `email` varchar(100), `pass` varchar(255), `salt` varchar(16),`user_type` TINYINT, `state_residence` CHAR, `date_joined` DATE,`inactive` TINYINT, PRIMARY KEY(`id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupTagBridge = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `tags_users_bridge`( `users_id` INT(10),`tag_id` INT(10),PRIMARY KEY(`users_id`, `tag_id`),FOREIGN KEY(`users_id`) REFERENCES `users`(`id`),FOREIGN KEY(`tag_id`) REFERENCES `tags`(`tag_id`) );", 
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupTagWords = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `tags` (`tag_id` INT(10) AUTO_INCREMENT, `tag_word` VARCHAR(50), PRIMARY KEY(`tag_id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupComments = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `comments`(`comment_id` INT(10), `creator_id` INT(10), `post_id` INT(10), `comment_text` VARCHAR(280), `date_created` DATE,PRIMARY KEY(`comment_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`),FOREIGN KEY(`post_id`) REFERENCES `posts`(`post_id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupAnnouncements = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `announcements`(`announcement_id` INT(10) PRIMARY KEY, `creator_id` INT(10), `group_id` INT(10), `announcement_text` VARCHAR(280), `date_created` DATE, PRIMARY KEY(`announcement_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`),FOREIGN KEY(`group_id`) REFERENCES groups(`group_id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupEvents = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `events`(`event_id` INT(10), `group_id` INT(10), `date_created` DATE, `event_date` DATE, `event_desc` VARCHAR(200),PRIMARY KEY(`event_id`),FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupPosts = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `posts` (`post_id` INT(10) AUTO_INCREMENT, `creator_id` INT(10), `tag_id1` INT(10), `tag_id2` INT(10), `tag_id3` INT(10), `date_created` DATE, `title` VARCHAR(100), `post_text` VARCHAR(280), PRIMARY KEY(`post_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupPolls = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `polls` (`poll_id` INT(10),  `creator_id` INT(10), `question` VARCHAR(150),  `answer1` VARCHAR(50), `answer2` VARCHAR(50), `count_answer1` INT, `count_answer2` INT, `date_created` DATE,PRIMARY KEY(`poll_id`), FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupGroups = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `groups` (`group_id` INT(10), `creator_id` INT(10), `group_name` VARCHAR(20), PRIMARY KEY(`group_id`),FOREIGN KEY(`creator_id`) REFERENCES `users`(`id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };

// db.setupGroupsBridge = function(db, result)
// {
//     connection.query("CREATE TABLE IF NOT EXISTS `group_members_bridge`(`group_id` INT(10),`member_id` INT(10),PRIMARY KEY(`group_id`, `member_id`),FOREIGN KEY(`group_id`) REFERENCES `groups`(`group_id`),FOREIGN KEY(`member_id`) REFERENCES `users`(`id`) );",
//     function(err, res)
//     {
//         if (err){
//         result(err, null);
//         }
//         else 
//         {
//         result(null, {"code": 200});
//         }
//     });
// };


module.exports = db;



