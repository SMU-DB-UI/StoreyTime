'use strict';

var Poll = require('../Models/polls.js');

exports.createPoll = function(req,res){
    if(!req.params.creator_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing user ID in params"
        });
    }
    var newPoll = new Poll(req.body);
    Poll.createPoll(req.params.creator_id, newPoll, function(err,poll){
        if(err)
            result.send(err);
        else    
            result.json(poll);
    });
};

//adding tags end point
exports.addTags = function(req,res){
    if(!req.body.poll_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing poll ID in body"
        });
    }else if(!req.params.creator_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing creator ID in params"
        });
    }else if(!req.body.tag_word){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing tag word in body"
        });
    }else{
        Poll.addTags(req.body.poll_id, req.params.creator_id,req.body.tag_word,function(err,poll){
            if(err)
                res.send(err);
            else
                res.json(poll);
        });
    }    
};

//adding option end point
exports.addOption = function(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing poll ID in params"
        });
    }else if(!req.body.answer_text){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing answer text in body"
        });
    }else{
        Poll.addOption(req.params.poll_id, req.body.answer_text, function(err,poll){
            if(err)
                res.send(err);
            else
                res.json(poll);
        });
    }

};

//update answercount end point
exports.updateAnswerCount = function(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing poll ID in params"
        });
    }else if(!req.body.answer_text){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing answer text in body"
        });
    }else if(!req.body.answer_count){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing answer count in body"
        });
    }else{
        Poll.updateAnswerCount(req.params.poll_id, req.body.answer_text, req.body.answer_count,function(err,poll){
            if(err)
                res.send(err);
            else
                res.json(poll);
        });
    }
};

//soft delete poll end point
exports.deletePoll = function(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code" : 400,
            "response" : "Missing poll ID in params"
        });
    }else{
        Poll.deletePoll(req.params.poll_id, function(err,poll){
            if(err)
                res.send(err);
            else
                res.json(poll);
        });
    }
};