/*starting new events
update events information*/
'use strict';

var sql = require('./db.js');

var Event = function(event){
    //primary key event_id int(10)
    this.event_id = event.event_id,
    //id of events

    //group_id int(10)
    this.group_id = event.group_id,
    //id of the group that holds the event

    //date_created date
    this.date_created = event.date_created,
    //time when the event is created

    //event_date date
    this.event_date = event.event_date,
    //time when the event is on

    //event_desc varchar(200)
    this.event_desc = event.event_desc
    //description on the event
};

Event.createEvent = function(newEvent,result){
    sql.query("INSERT INTO `ballotBuddy`.`events` (`event_id`,`group_id`,`date_created`,`event_date`,`event_desc`) VALUES ('" + newEvent.event_id +"','" + newEvent.group_id + "','" + newEvent.date_created + "','" + newEvent.event_date + "','" + newEvent.event_desc + "');",
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code": 201,
                "response" : "Event creation complete."
            });
        }
    });
};

//Event creation date will not be changed
//event holder, the group_id, will not be changed
//event id, can only be deleted
//the user will be able to modify:
//      event_date
//      event_desc

Event.updateEventTime = function updateEventTime(event_id,newDate,result){
    sql.query("UPDATE `ballotBuddy`.`events` SET event_date = ? WHERE event_id = ?;",[newDate,event_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code" : 200,
                "response" : "Event time update completes.",
                "event_id" : newDate
            });
        }
    });
};

Event.updateEventDesc = function updateEventDesc(event_id,newDesc,result){
    sql.query("UPDATE `ballotBuddy`.`events` SET event_desc = ? WHERE event_id = ?;",[newDesc,event_id],
    function(err,res){
        if(err){
            result(err,null);
        }else{
            result(null,{
                "code" : 200,
                "response" : "Event description update completes.",
                "event_id" : newDesc
            });
        }
    });
};

//==========================Get Information===========================

Event.getEventDesc = function getEventDesc(event_id,result){
    sql.query("SELECT event_desc FROM `ballotBuddy`.`events` WHERE event_id = ?;",[event_id],
    function(err,res){
        if(err){
            result({
                "code":204,
                "response" : "Cannot find event description based on input evnet ID."
            },null);
        }else{
            result(null,res);
        }
    });
};