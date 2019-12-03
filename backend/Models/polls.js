'use strict';
var sql = require('./db.js');
//copy constructor poll
var Poll = function(poll){
    //poll_id INT(10) PRIMARY KEY,
    this.poll_id = poll.poll_id,
    //INT(10) PRIMARY KEY //id of the polls
    
    // creator_id INT(10), 
    this.creator_id = poll.creator_id,
    //INT(10) //id of the creator
    
    //question VARCHAR(150),
    this.question = poll.question,
    //VARCHAR(150) // the titile of polls, what is people voting for
    
    //date_created DATE
    this.date_created = poll.date_created,
    //DATE // Time of creation
    //TINYINT : declaration of whether this poll is soft deleted
    this.inactive = poll.inactive
    //answers and tags of polls will be recorded in another tables
};
//copy constructor poll_answer
// var PollAnswer = function(answer){
//     //INT(10) PRIMARY KEY : id of the polls
//     this.poll_id = answer.poll_id,
//     //VARCHAR(150) PRIMARY KEY : text of this very answer
//     this.answer_text = answer.answer_text,
//     //INT : count of vote
//     this.answer_count = answer.answer_count
// };
// //copy constructor tags_poll
// var PollTag = function(tag){
//     //INT(10) PRIMARY KEY : id of the tags
//     this.tag_id = tag.tag_id,
//     //INT(10) PRIMARY KEY : id of the polls
//     this.poll_id = answer.poll_id
// };
//insert new tuple into the table
Poll.createPoll = function(creator_id,newPoll, result) {
    //get datetime
    var t = new Date;
    var yearTime = t.getFullYear();
    var monthTime = t.getMonth();
    var day = t.getDate();
    var time = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
    var dateTime = yearTime + '-' + monthTime + '-' + day + ' ' + time;  
  sql.query("INSERT INTO `ballotBuddy`.`polls` (`creator_id`,`question`,`date_created`) VALUES ('" + creator_id + "', '" + newPoll.question + "', '" + dateTime +  "');",
    function(err, res) {
    if (err){
        result(err, null);
    }else{
        sql.query("SELECT MAX(`poll_id`) FROM `ballotBuddy`.`polls` WHERE `creator_id`  = ?;",[creator_id],
        function(err1,res1)
        {
              if(res1.length > 0)
              {
                  result(null,{"code" : 200, "poll_id" : res1[0]['MAX(poll_id)'],"creator_id" : creator_id });
              }
              else
              {
                  result(err1,null);
              }
        }); 
    }
    });
};
//adding a new tag to certain poll
Poll.addTag = function(poll_id, creator_id, tag_word, result){
    sql.query("SELECT tag_id FROM `ballotBuddy`.`tags` WHERE tag_word = ?;", [tag_word],
    function(err,res){
        if(err)
            result(err,null);
        else{
            sql.query("INSERT INTO `ballotBuddy`.`tags_polls` (`tag_id`, `poll_id`) VALUES ( '" + res[0].tag_id + "', '" + poll_id + "');", 
            function(err1,res1){
                if(err1)
                    result(err1,null);
                else{
                    result(null,{
                        "code" : 200,
                        "poll_id" : poll_id,
                        "user_id" : creator_id
                    });
                }
            });
        }
    });
};
//adding a new option for the answer
Poll.addOption = function(poll_id, answer_text, result){
    sql.query("INSERT INTO `ballotBuddy`.`polls_answers` (`poll_id`,`answer_text`,`answer_count`) VALUES ('" + poll_id + "', '" + answer_text + "', '"+0+"');",
    function(err,res){
        if(err)
            result(err,null);
        else{
            result(null,{
                "code" : 200,
                "poll_id" : poll_id
            });
        }
    });
};
//update counting of a certain answer, locating by poll_id and answer_text
//This function will match up poll_id and answer_text in polls_answer table,
//which poll_id and answer_text are unique in the table, and update the answer_count
Poll.updateAnswerCount = function(poll_id,answer_text,answer_count,result){
    sql.query("UPDATE `ballotBuddy`.`polls_answers` SET answer_count = ? WHERE poll_id = ? AND answer_text = ?;",[answer_count,poll_id,answer_text],
    function(err,res){
        if(err)
            result(err,null);
        else    
            result(null,{
                "code" : 200,
                "poll_id" : poll_id,
                "answer_text" : answer_text,
                "answer_count" : answer_count
            });
    });

};

Poll.deletePoll = function(poll_id, creator_id, result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET inactive = 1 WHERE poll_id = ? AND creator_id = ?", [poll_id, creator_id],
    function(err,res){
        if(err)
            result(err,null);
        else 
            result(null,{
                "code" : 200,
            });
    });
};

module.exports = Poll;
