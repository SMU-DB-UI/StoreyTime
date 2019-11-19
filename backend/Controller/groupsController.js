'use strict';

var Group = require('../Models/group.js');

exports.createGroup = function(request, result) {
    var newGroup = new Group(request.body);
    if(!group_id || !creator_id || !group_name || !member_count ){
        res.status(400).json({
            "code":400,
            "response": "Insufficient Input."
        });
    }
    else{
        Group.createGroup(newGroup, function(err, group)
    {
        if(err){
            result.send(err);
        }
        else{
            result.json(group);
        }
    }); 
    }
};

exports.inviteMembers = funciton(req,res){
    if(!req.params.joinedGroup.group_id){
        res.status(400).json({
            "code":400,
            "response":"Missing group id in API Request."
        });
    }else if(!req.body.newMember.id){
        res.status(400).json({
            "code":400,
            "response":"Missing new member id in API Request Body."
        });
    }else{
        Group.inviteMembers(req.params.joinedGroup.group_id, req.body.newMember.id, function(err,invited){
            if(err){
                res.send(err);
            }else{
                res.json(invited);
            }
        });
    }
};