'use strict';
var sql = require('./db.js');

var Poll = function(poll){
    this.poll_id = poll.poll_id, 
    this.creator_id = poll.creator_id,
    this.question = poll.question,
    this.date_created = poll.date_created,
    this.inactive = poll.inactive
};

Poll.createPoll = function(creator_id,newPoll, result) {
    //get datetime
    var t = new Date;
    var yearTime = t.getFullYear();
    var monthTime = t.getMonth();
    var day = t.getDate();
    var time = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
    var dateTime = yearTime + '-' + monthTime + '-' + day + ' ' + time;  
  sql.query("INSERT INTO `ballotBuddy`.`polls` (`creator_id`,`question`,`date_created`, `inactive`) VALUES ('" + creator_id + "', '" + newPoll.question + "', '" + dateTime +  "', '"+ 0 +"');",
    function(err, res) {
    if (err){
        result(err, null);
    }else{
        sql.query("SELECT MAX(`poll_id`) FROM `ballotBuddy`.`polls` WHERE `creator_id`  = ?;",[creator_id],
        function(err1,res1)
        {
              if(res1.length > 0)
              {
                  result(null,{"code" : 200, "poll_id" : res1[0]['MAX(`poll_id`)'],"creator_id" : creator_id });
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

Poll.getMyPolls = function(creator_id, result) {
    sql.query("select `creator_id`, PID, `question`, group_concat(distinct `tag_word`), group_concat(distinct `answer_text`), group_concat( `answer_count`), `date_created`, `inactive` from `ballotBuddy`.`polls` as p_o join (select `poll_id` as PID, `answer_text`, `answer_count`, `tag_word` from `ballotBuddy`.`polls_answers` as p_a join (select `tag_word`, `tag_id`, `poll_id` as pid from `ballotBuddy`.`tags` as T join (select `poll_id`, `tag_id` as tid from `ballotBuddy`.`tags_polls`) as P on T.tag_id=P.tid) as p_t on p_a.poll_id = p_t.pid) as a_p on p_o.poll_id = a_p.PID where creator_id=? group by PID order by date_created desc;", [creator_id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, res});
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

//soft delete poll
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
