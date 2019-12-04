var Group = require('../Models/group.js');

exports.createGroup = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else
    {  
       var newGroup = new Group(request.body);
       Group.createGroup(request.params.id, newGroup, function(err, group)
       {
           if(err)
           {
               result.send(err);
           }
           else 
           {
               result.json(group);
           }
        }); 
    }
};

exports.findMembers = function(request, result) {
    if(! request.body.firstName)
    {
        result.status(400).json({"code":400, "response":"Missing first name in body"});
    }
    else if(! request.body.lastName)
    {
        result.status(400).json({"code":400, "response": "Missing last name in body"});
    }
    else
    {
        Group.findMembers(request.body.firstName, request.body.lastName, function(err, group)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(group);
            }
        });
    }
};

exports.inviteMembers = function(request, result) {
    if(!request.params.group_id)
    {
        result.status(400).json({"code":400, "response":"Missing group ID in request"});
    }
    else if(!request.body.id)
    {
        result.status(400).json({"code":400, "response":"Missing user ID in request"});
    }
    else 
    {
        Group.inviteMembers(request.body.id, request.params.group_id, function(err, group)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(group);
            }
        });
    }
};

exports.getMembers = function(request, result) {
    if(!request.params.group_id)
    {
        result.status(400).json({"code":400, "response":"Missing group ID in params"});
    }
    else
    {
        Group.getMembers(request.params.group_id, function(err, group)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(group);
            }
        });
    }
};

exports.removeUserFromGroup = function(request, result) {
   if(!request.params.group_id)
   {
       result.status(400).json({"code":200, "response":"Missing group id in request"});
   }
   else if(!request.body.member_id)
   {
       result.status(400).json({"response":"Missing member_id in body"});
   }
   else
   {
       Group.removeMembersFromGroup(request.body.member_id, request.params.group_id, function(err, group)
       {
           if(err)
           {
               result.send(err);
           }
           else
           {
               result.json(group);
           }

       });
   }
};

exports.deleteGroup = function(request, result) {
    if(!request.params.group_id)
    {
        result.status(400).json({"code":400, "response":"Missing group id in request"});
    }
    else
    {
        Group.deleteGroup(request.params.group_id, function(err, group)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(group);
            }
        });
    }
};

exports.selectNewAdmin = function(request, result) {
    if(!request.params.group_id)
    {
        result.status(400).json({"code":400, "response": "Missing group id in request"});
    }
    else if(!request.body.firstName)
    {
        result.status(400).json({"code":400, "response": "Missing first name in request"});
    }
    else if(!request.body.lastName)
    {
        result.status(400).json({"code":400, "response": "Missing last name in request"});
    }
    else
    {
        Group.selectNewAdmin(request.params.group_id, request.body.firstName, request.body.lastName, function(err, group)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(group);
            }
        });
    }
};

exports.setNewAdmin = function(request, result) {
    if(!request.params.group_id)
    {
        result.status(400).json({"code":400, "response": "Missing group id in request"});
    }
    else if(!request.body.id)
    {
        result.status(400).json({"code":400, "response": "Missing id in request body"});
    }
    else
    {
        Group.setNewAdmin(request.params.group_id, request.body.id, function(err, group)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(group);
            }
        });
    }
};







