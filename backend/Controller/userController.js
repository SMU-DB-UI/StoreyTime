var User = require('../Models/users.js');

exports.createUser = function(request, result) {
    var newUser = new User(request.body);
    if (!newUser.email){
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
    if(!req.body.email)
    {
        res.status(400).json({"code":400, "response":"Missing email in body"});
    }
    else if(! req.body.pass)
    {
        res.status(400).json({"code":400, "response":"Missing password in body"});
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

exports.getUser = function(req, res) {
    if(! req.params.id)
    {
        res.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else 
    {
        User.getUser(req.params.id, function(err, user) 
        {
            if(err)
            {
                res.send(err);
            }
            else 
            {
                res.json(user);
            }
        });
    }
};

exports.resetPassword = function(req, res) {
    if(!req.params.id)
    {
        res.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! req.body.pass)
    {
        res.status(400).json({"code":400, "response":"Missing password in body"});
    }
    else 
    {
        User.changePassword(req.params.id, req.body.pass, function(err, user)
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

exports.changeFirstName = function(req, res) {
    if(!req.params.id)
    {
        res.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! req.body.firstName)
    {
        res.status(400).json({"code":400, "response":"Missing first name in body"});
    }
    else
    {
        User.updateFirstName(req.params.id, req.body.firstName, function(err, user)
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

exports.changeLastName = function(req, res) {
    if(!req.params.id)
    {
        res.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! req.body.lastName)
    {
        res.status(400).json({"code":400, "response":"Missing last name in body"});
    }
    else
    {
        User.updateLastName(req.params.id, req.body.lastName, function(err, user)
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

exports.changeEmail = function(req, res) {
    if(! req.params.id)
    {
        res.status(400).json({"code":400, "response":"Missing ID in request"});
    }
    else if(! req.body.email)
    {
        res.status(400).json({"code":400, "response":"Missing email in body"});
    }
    else
    {
        User.updateEmail(req.params.id, req.body.email, function(err, user)
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



