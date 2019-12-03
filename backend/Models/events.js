
'use strict';

var sql = require('./db.js');

var Event = function(event){
    this.event_id = event.event_id,
    this.group_id = event.group_id,
    this.creator_id = event.creator_id,
    this.date_created = event.date_created,
    this.event_date = event.event_date,
    this.event_desc = event.event_desc
};

Event.createEvent = function(group_id, newEvent, result){
    var d = new Date;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var date = year+ '-' + month + '-' + day;
    sql.query("INSERT INTO `ballotBuddy`.`events` (`group_id`,`date_created`,`event_date`,`event_desc`) VALUES ('" + group_id + "','" + date + "','" + newEvent.event_date + "','" + newEvent.event_desc + "');",
    function(err,res)
    {
        if(err){
            result(err,null);
        }
        else
        {
            connection.query("SELECT MAX(`event_id`) FROM `ballotBuddy`.`events` WHERE `creator_id` = ?", [creator_id],
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else
                {
                    result(null,{"code": 200, "event_id": res1[0]['MAX(`post_id`)'], "response" : "Event creation complete."});
                } 
            });     
        }
    });
};

Event.updateEventTime = function(event_id,creator_id, newDate,result){
    sql.query("UPDATE `ballotBuddy`.`events` SET event_date = ? WHERE event_id = ? AND creator_id = ?;",[newDate, event_id, creator_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{"code" : 200,"event_id": event_id});
        }
    });
};

Event.updateEventDesc = function(event_id, creator_id, newDesc,result){
    sql.query("UPDATE `ballotBuddy`.`events` SET event_desc = ? WHERE event_id = ? AND creator_id = ?",[newDesc, event_id, creator_id],
    function(err,res){
        if(err)
        {
            result(err,null);
        }
        else
        {
            result(null,{
                "code" : 200,
                "creator_id" : creator_id,
                "event_id" : event_id
            });
        }
    });
};

//==========================Get Information===========================

Event.getEvent = function(event_id,result){
    sql.query("SELECT * FROM `ballotBuddy`.`events` WHERE event_id = ?;",[event_id],
    function(err,res){
        if(err){
            result(err, null);
        } else {
            result(null,res);
        }
    });
};

module.exports = Event;