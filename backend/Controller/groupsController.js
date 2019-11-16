var Group = require('../Models/group.js');

exports.createGroup = function(request, result) {
    var newGroup = new Group(request.body);
    Group.createGroup(newGroup, function(err, group)
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


export.