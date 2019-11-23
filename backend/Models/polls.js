'use strict';

var sql = require('./db.js');


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
    this.inactive = poll.tag

    //answers and tags of polls will be recorded in another tables
};


var PollAnswer = function(answer){

    //INT(10) PRIMARY KEY : id of the polls
    this.poll_id = answer.poll_id,

    //VARCHAR(150) PRIMARY KEY : text of this very answer
    this.answer_text = answer.answer_text,

    //INT : count of vote
    this.answer_count = answer.answer_count
};


var PollTag = function(tag){

    //INT(10) PRIMARY KEY : id of the tags
    this.tag_id = tag.tag_id,

    //INT(10) PRIMARY KEY : id of the polls
    this.poll_id = answer.poll_id
};


//insert new tuple into the table
Poll.createPoll = function(newPoll, result) {
  sql.query("INSERT INTO `ballotBuddy`.`polls` (`creater_id`,`question`,`date_created`,`inactive`) VALUES ('" + newPoll.creator_id + "', '" + newPoll.question + "', '" + newPoll.date_created + "', '" + newPoll.inactive + "');",
    function(err, res) {
      if (err){
        result(err, null);
      }else{
        result(null,{
            "code":200 
        });
      }
    });
};


//adding new options of answers and linked with polls based on poll_id
PollAnswer.addAnswer = function(newAnswer, result){
    sql.query("INSERT INTO `ballotBuddy`.`polls_answers` (`poll_id`,`answer_text`,`answer_count`) VALUES ('"+ newAnswer.poll_id + "','" + newAnswer.answer_text + "','" + newAnswer.answer_count + "');",
    function(err,res){
        if(err)
            result(err,null);
        else
            result(null,{
                "code":200
            });
    });
};


//adding new tags to the polls based on poll_id
PollTag.addTag = function(newTag,result){
    sql.query("INSERT INTO `ballotBuddy`.`polls_answers` (`poll_id`,`tag_id`) VALUE ('"+ newTag.tag_id + "','" + newTag.poll_id + "');",
    function(err,res){
        if(err)
            result(err,null);
        else    
            result(null,{
                "code" : 200
            });

    });
};


//update the question text in certain tuple which has certain poll
Poll.updateQuestionById = function updateQuestionById(creator_id, poll_id, question, result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET question = ? WHERE poll_id = ? AND creator_id = ?",[question, poll_id, creator_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "question":question,
                "poll_id": poll_id
            });
        }
    });
};


//redo the answer related updating funcitons






//******************************************************************************


Poll.getCreationDate = function getCreationDate(poll_id,result){
    sql.query("SELECT date_created FROM POLL WHERE poll_id = ? ;", [poll_id],
    function(err,res){
        if(err){
            result({
                "code":204,
                "response" : "Cannot find this ID in the table."
            },null);
        }else{
            result(null,res);
        }
    });
};


Poll.getQuestionById = function getQuestionById(poll_id,result){
    sql.query("SELECT question FROM POLL WHERE poll_id = ?;", [poll_id],
    function(err,res){
        if(err){
            result({
                "code":204,
                "response" : "Cannot find this ID in the table."
            },null);
        }else{
            result(null,res);
        }
    });
};


Poll.getCreatorId = function getCreatorId(poll_id,result){
    sql.query("SELECT creator_id FROM POLL WHERE poll_id = ?;", [poll_id],
    function(err,res){
        if(err){
            result({
                "code":204,
                "response" : "Cannot find this ID in the table."
            },null);
        }else{
            result(null,res);
        }
    });
};


Poll.getAllPolls = function getAllPolls(result) {
    sql.query("SELECT * FROM Poll;", [], 
    function(err, res){
      if(err) {
        result(err, null);
      }else{
        result(null, res);
      }
    });
};
  

Poll.getPollByID = function getPollByID(poll_id, result) {
    sql.query("Select * FROM Poll WHERE poll_id = ?;", [poll_id], 
    function(err, res){
      if(err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
module.exports = Poll;
