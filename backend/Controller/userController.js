var User = require('../Models/users.js');

exports.createUser = function(request, result) {
    var newUser = new User(request.body);
    if (! newUser.email){
        result.status(400).json({ "code":400, "respose": "Invalid inputs." });
    }else{
        User.createUser(newUser, function(err, user){
            //if error, send error
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.loginUser = function(request, result) {
    if(!request.body.email)
    {
        result.status(400).json({"code":400, "response":"Missing email in body"});
    }
    else if(! request.body.pass)
    {
        result.status(400).json({"code":400, "response":"Missing password in body"});
    }
    else
    {
        var LoginUser = new User(request.body);
        User.login(LoginUser, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.followTag = function(request, result)
{
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response": "Missing ID in params"});
    }
    else
    {
        User.followTag(request.params.id, request.body.tag_word, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.getPoliticians = function(request, result) {
    User.getPoliticians(function(err, user)
    {
        if(err)
        {
            result.send(err);
        }
        else
        {
            result.json(user);
        }
    });
};

exports.getUser = function(request, result) {
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else 
    {
        User.getUser(request.params.id, function(err, user) 
        {
            if(err)
            {
                result.send(err);
            }
            else 
            {
                result.json(user);
            }
        });
    }
};

exports.getTagsFollowing = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in params"});
    }
    else
    {
        User.getTagsFollowing(request.params.id, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.getPostsFeed = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in params"});
    }
    else
    {
        User.getPostsFeed(request.params.id, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.getPollsFeed = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else
    {
        User.getPollsFeed(request.params.id, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.resetPassword = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! request.body.pass)
    {
        result.status(400).json({"code":400, "response":"Missing password in body"});
    }
    else 
    {
        User.changePassword(request.params.id, request.body.pass, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else 
            {
                result.json(user);
            }
        });
    }
};

exports.changeFirstName = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! request.body.firstName)
    {
        result.status(400).json({"code":400, "response":"Missing first name in body"});
    }
    else
    {
        User.updateFirstName(request.params.id, request.body.firstName, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        })

    }
};

exports.changeLastName = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! request.body.lastName)
    {
        result.status(400).json({"code":400, "response":"Missing last name in body"});
    }
    else
    {
        User.updateLastName(request.params.id, request.body.lastName, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        })

    }
};

exports.changeEmail = function(request, result) {
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! request.body.email)
    {
        result.status(400).json({"code":400, "response":"Missing email in body"});
    }
    else
    {
        User.updateEmail(request.params.id, request.body.email, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }

        });

    }
};

exports.changeStateResidence = function(request, result) {
    if(!request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing ID in request parameters"});
    }
    else if(! request.body.state_residence)
    {
        result.status(400).json({"code":400, "response":"Missing state of residence in body"});
    }
    else
    {
        User.updateState(request.params.id, request.body.state_residence, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.deleteProfile = function(request, result) {
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing id in parameters"});
    }
    else
    {
        User.deleteProfile(request.params.id, function(err, user)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(user);
            }
        });
    }
};

exports.searchUsers = function(request, result) {
    if(! request.body.firstName)
    {
        result.status(400).json({"code":400, "response":"Missing name in body"});
    }
    else if(!request.body.lastName)
    {
        User.search(request.body.firstName, "", function(err, users)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(users);
            }
        });
    }
    else
    {
        User.search(request.body.firstName, request.body.lastName, function(err, users)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(users);
            }
        });
    }
};


