var User = require('../Models/users.js');

exports.createUser = function(request, result) {
    var newUser = new User(request.body);
    // if something is wrong , send 400
    //else
    User.createUser(newUser, function(err, user)
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

exports.loginUser = function(request, result) {
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
};

exports.editUser = function(request, result) {

};

exports.updateUser = function(request, results) {

};


