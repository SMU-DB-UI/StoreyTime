var User = require('../Models/users.js');


exports.createUser = function(request, result) {
    var newUser = new User(request.body);
    // if something is wrong , send 400
    //else
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
    var LoginUser = new User(request.body);
    User.login(LoginUser, function(err, user)
    {

    });
};

exports.editUser = function(request, result) {

};

exports.updateUser = function(request, results) {

};


