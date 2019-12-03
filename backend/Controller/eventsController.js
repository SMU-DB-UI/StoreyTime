'use strict';

var Event = require('../Models/events');

exports.createEvent = function(req,res){
    var newEvent = new Event(req.body);
    if(!newEvent.event_id || !newEvent.date_created || !newEvent.event_date || !newEvent.event_desc)
    {
        res.status(400).json({"code":400, "response":"Insufficient Input."});
    }
    else if(!req.params.group_id) 
    {
        res.status(400).json({"code":200, "response":"missing group ID in params"});
    }
    else { 
        Event.createEvent(group_id, newEvent,function(err,event){
            if(err)
                res.send(err);
            else
                res,json(event);
        });
    }
};

exports.updateEventTime = function(req,res){
    if(!req.params.event_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing event_id in params"
        });
    }else if(! req.body.creator_id)
    {
        res.status(400).json({"code":400, "response":"Missing creator id in body"});
    }
    else if(!req.body.event_date){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing the event_date in body"
        });
    }else{
        Event.updateEventTime(req.params.event_id, req.body.creator_id, req.body.event_date,function(err,event){
            if(err)
                res.send(err);
            else
                res.json(event);
        });
    }
};

exports.updateEventDesc = function(req,res){
    if(!req.params.event_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing event_id in params"
        });
    }else if(!req.body.event_desc){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing the new event_desc in body"
        });
    } else if(! req.body.creator_id)
    {
        res.status(400).json({"code":400, "response":"Missing creator id in body"});
    }
    else{
        Event.updateEventDesc(req.params.event_id, req.body.creator_id, req.body.event_desc,function(err,event){
            if(err)
                res.send(err);
            else
                res.json(event);            
        });
    }
};

exports.getEvent = function(req,res){
    if(!req.params.event_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing event_id in params"
        });
    }
    else
    {
        Event.getEvent(req.params.event_id,function(err,event){
            if(err)
                res.send(err);
            else
                res.json(event);        
        });
    }
};
