'use strict';

var Poll = require('../Models/polls.js');

exports.createPoll = function(req,res){
    var newInput = new Poll(req.body);
    if(!newInput.poll_id || !newInput.creator_id || !newInput.question || !newInput.date_created || !newInput.answer1 || !newInput.answer2 || !newInput.count_answer1 || !newInput.count_answer2){
        res.status(400).json({
            "code":400,
            "response": "Insufficient Input."
        });
    }else{
        Poll.createPoll(newInput,function(err,poll){
            if(err){
                res.send(err);
            }
            else{
                res.json(poll);
            }
        });
    }
};

exports.updateQuestionById = function updateQuestionById(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code":400,
            "response":"Missing Poll ID in API Request."
        });
    }else if(!req.body.question){
        res.status(400).json({
            "code":400,
            "response":"Missing Question Detials in API Request Body."
        });
    }else{
        Poll.updateQuestionById(req.params.poll_id, req.body.question, function(err,poll){
            if(err){
                res.send(err);
            }else{
                res.json(poll);
            }
        });
    }
};

// exports.updateCreatorByPollId = function updateCreatorByPollId(req,res){
//     if(!req.params.poll_id){
//         res.status(400).json({
//             "code":400,
//             "response":"Missing Poll ID in API Request."
//         });
//     }else if(!req.body.creator_id){
//         res.status(400).json({
//             "code":400,
//             "response":"Missing creator id in API Request Body."
//         });
//     }else{
//         Poll.updateCreatorByPollId(req.params.poll_id, req.body.creator_id, function(err,poll){
//             if(err){
//                 res.send(err);
//             }else{
//                 res.json(poll);
//             }
//         });
//     }
// };

// exports.updateCreationDateById = function updateCreationDateById(req,res){
//     if(!req.params.poll_id){
//         res.status(400).json({
//             "code":400,
//             "response":"Missing Poll ID in API Request."
//         });
//     }else if(!req.body.date_created){
//         res.status(400).json({
//             "code":400,
//             "response":"Missing creation date in API Request Body."
//         });
//     }else{
//         Poll.updateCreationDateById(req.params.poll_id, req.body.date_created, function(err,poll){
//             if(err){
//                 res.send(err);
//             }else{
//                 res.json(poll);
//             }
//         });
//     }
// };

exports.updateAnswer1ById = function updateAnswer1ById(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code":400,
            "response":"Missing Poll ID in API Request."
        });
    }else if(!req.body.answer1){
        res.status(400).json({
            "code":400,
            "response":"Missing first answer details in API Request Body."
        });
    }else{
        Poll.updateAnswer1ById(req.params.poll_id, req.body.answer1, function(err,poll){
            if(err){
                res.send(err);
            }else{
                res.json(poll);
            }
        });
    }
};


exports.updateAnswer2ById = function updateAnswer2ById(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code":400,
            "response":"Missing Poll ID in API Request."
        });
    }else if(!req.body.answer2){
        res.status(400).json({
            "code":400,
            "response":"Missing second answer details in API Request Body."
        });
    }else{
        Poll.updateAnswer2ById(req.params.poll_id, req.body.answer2, function(err,poll){
            if(err){
                res.send(err);
            }else{
                res.json(poll);
            }
        });
    }
};

exports.updateCount1ById = function updateCount1ById(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code":400,
            "response":"Missing Poll ID in API Request."
        });
    }else if(!req.body.count_answer1){
        res.status(400).json({
            "code":400,
            "response":"Missing counting of first answer in API Request Body."
        });
    }else{
        Poll.updateCount1ById(req.params.poll_id, req.body.count_answer1, function(err,poll){
            if(err){
                res.send(err);
            }else{
                res.json(poll);
            }
        });
    }
};

exports.updateCount2ById = function updateCount2ById(req,res){
    if(!req.params.poll_id){
        res.status(400).json({
            "code":400,
            "response":"Missing Poll ID in API Request."
        });
    }else if(!req.body.count_answer2){
        res.status(400).json({
            "code":400,
            "response":"Missing counting of second answer in API Request Body."
        });
    }else{
        Poll.updateCount2ById(req.params.poll_id, req.body.count_answer1, function(err,poll){
            if(err){
                res.send(err);
            }else{
                res.json(poll);
            }
        });
    }
};


exports.getAnswer1ById = function(req, res) {
    Poll.getAnswer1ById(req.params.poll_id, function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
  };

exports.getAnswer2ById = function(req, res) {
    Poll.getAnswer2ById(req.params.poll_id, function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
};

exports.getCountAnswer1 = function(req, res) {
    Poll.getCountAnswer1(req.params.poll_id, function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
};

exports.getCreationDate = function(req, res) {
    Poll.getCreationDate(req.params.poll_id, function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
};

exports.getQuestionById = function(req, res) {
    Poll.getQuestionById(req.params.poll_id, function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
};

exports.getCreatorId = function(req, res) {
    Poll.getCreatorId(req.params.poll_id, function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
};

exports.getAllPolls = function(req, res) {
    Poll.getAllPolls(function(err, poll){
      if (err)
        res.send(err);
      else
        res.json(poll);
    });
};