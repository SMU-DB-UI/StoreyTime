'use strict';

var sql = require('./db.js');


var Poll = function(poll){

    //poll_id INT(10) PRIMARY KEY,
    this.poll_id = poll.poll_id,
    //INT(10) PRIMARY KEY //id of the polls
    
    // creator_id INT(10), 
    this.creator_id = poll.creator_id,
    //INT(10) //id of the creater
    
    //question VARCHAR(150),
    this.question = poll.question,
    //VARCHAR(150) // the titile of polls, what is people voting for
    
    //date_created DATE
    this.date_created = poll.date_created,
    //DATE // Time of creation

    //answer1 VARCHAR(50), 
    this.answer1 = poll.answer1,
    //VARCHAR(150) // detials of answer1

    //answer2 VARCHAR(50), 
    this.answer2 = poll.answer2,
    //VARCHAR(150) // detials of answer2

    //count_answer1 INT, 
    this.count_answer1 = poll.count_answer1,
    //INT // NUM number of the votes

    //count_answer2 INT, 
    this.count_answer2 = poll.count_answer2
     //INT // NUM number of the votes

     //we just have 2 answer， and the quesiton is a T/F question
};


Poll.createPoll = function(newPoll, result) {
  sql.query("INSERT INTO `ballotBuddy`.`polls` (`poll_id`,`creator_id`,`question`,`date_created`,`answer1`,`answer2`,`count_answer1`,`count_answer2`) VALUES ('" + newPoll.poll_id + ", " + newPoll.creator_id + ", " + newPoll.question + ", " + newPoll.date_created + ", " + newPoll.answer1 + ", " + newPoll.answer2 + ", " + newPoll.count_answer1 + ", " + newPoll.count_answer2 + ");",
    function(err, res) {
      if (err){
        result(err, null);
      }else{
        result(null,{
            "code":201,
            "response":"Poll creation was sucessfull."
        });
      }
    });
};

Poll.updateCreatorByPollId = function updateCreatorByPollId(poll_id,creator_id,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET creator_id=? WHERE poll_id = ?;", [creator_id,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update complete.",
                "creator_id":creator_id
            });
        }
    });
};

Poll.updateQuestionById = function updateQuestionById(poll_id,question,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET qustion = ? WHERE poll_id = ?",[question,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update compete",
                "question":question
            });
        }
    });
};

Poll.updateCreationDateById = function updateCreationDateById(poll_id,date_created,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET date_created = ? WHERE poll_id = ?", [date_created,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update compete",
                "date_created":date_created 
            });
        }
    });

};

Poll.updateAnswer1ById = function updateAnswer1ById(poll_id,answer1,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET answer1 = ? WHERE poll_id = ? ", [answer1,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update compete",
                "answer1":answer1
            });
        }
    });
};

Poll.updateAnswer2ById = function updateAnswer2ById(poll_id,answer2,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET answer2 = ? WHERE poll_id = ? ", [answer2,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update compete",
                "answer2":answer2
            });
        }
    });
};

Poll.updateCount1ById = function updateCount1ById(poll_id,count_answer1,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET count_answer1 = ? WHERE poll_id = ? ", [count_answer1,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update compete",
                "count_answer1":count_answer1
            });
        }
    });
};

Poll.updateCount2ById = function updateCount2ById(poll_id,count_answer2,result){
    sql.query("UPDATE `ballotBuddy`.`polls` SET count_answer2 = ? WHERE poll_id = ? ", [count_answer2,poll_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code":200,
                "response":"Update compete",
                "count_answer2":count_answer2
            });
        }
    });
};
//******************************************************************************
Poll.getAnswer1ById = function getAnswer1ById(poll_id,reulst){
    sql.query("SELECT answer1 FROM POLL WHERE poll_id = ? ;", [poll_id],
    function(err,res){
        if(err) {
            result({
                "code":204,
                "response":"Cannot find this ID in the table."
            }, null);
          }else{
            result(null, res);
        }
    });
};

Poll.getAnswer2ById = function getAnswer2ById(poll_id,reulst){
    sql.query("SELECT answer2 FROM POLL WHERE poll_id = ? ;", [poll_id],
    function(err,res){
        if(err) {
            result({
                "code":204,
                "response":"Cannot find this ID in the table."
            }, null);
          }else{
            result(null, res);
        }
    });
};

Poll.getCountAnswer1 = function getCountAnswer1(poll_id,result){
    sql.query("SELECT count_answer1 FROM POLL WHERE poll_id = ? ;", [poll_id],
    function(err,res){
        if(err) {
            result({
                "code":204,
                "response":"Cannot find this ID in the table."
            }, null);
          }else{
            result(null, res);
        }
    });
};

Poll.getCountAnswer2 = function getCountAnswer2(poll_id,result){
    sql.query("SELECT count_answer2 FROM POLL WHERE poll_id = ? ;", [poll_id],
    function(err,res){
        if(err) {
            result({
                "code":204,
                "response":"Cannot find this ID in the table."
            }, null);
          }else{
            result(null, res);
        }
    });
};

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
