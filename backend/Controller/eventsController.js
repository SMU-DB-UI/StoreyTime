'use strict';

var Event = require('../Models/events');

exports.creatEvent = function(req,res){
    var newEvent = new Event(req.body);
    if(!newEvent.event_id || !newEvent.group_id || !newEvent.date_created || !newEvent.event_date || !newEvent.event_desc){
        res.status(400).jason({
            "code":400,
            "response":"Insufficient Input."
        });
    }else{
        Event.createEvent(newEvent,function(err,event){
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
            "response" : "Missing event_id as input."
        });
    }else if(!req.body.event_date){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing the new event_date as input."
        });
    }else{
        Event.updateEventTime(req.params.event_id,req.body.event_date,function(err,event){
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
            "response" : "Missing event_id as input."
        });
    }else if(!req.body.event_desc){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing the new event_desc as input."
        });
    }else{
        Event.updateEventDesc(req.params.event_id,req.body.event_desc,function(err,event){
            if(err)
                res.send(err);
            else
                res.json(event);            
        });
    }
};


//=================Controllers of Getters

exports.getEventDate = function(req,res){
    Event.getEventDate(req.params.event_id,function(err,event){
        if(err)
            res.send(err);
        else
            res.json(poll);        
    });
};

exports.getEventDesc = function(req,res){
    Event.getEventDesc(req.params.event_id,function(err,event){
        if(err)
            res.send(err);
        else
            res.json(poll);        
    });
};