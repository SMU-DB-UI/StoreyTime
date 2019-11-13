
'use strict';

var connection = require('./db.js');
var crypto = require('crypto');

var salter = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);   
};

var sha224 = function(password, salt){
    var hash = crypto.createHmac('sha224', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

//copy user
var User = function(user){
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.pass = user.pass;
    this.salt = user.salt;
    this.user_type = user.user_type;
    this.state = user.state;
}

//create user
//newUser in controller
//after registration, should redirect to setupProfile page to add picture, tags, etc
User.createUser = function(newUser, result) {
    var salt = salter(16);
    var salt, newPass = sha224(newUser.pass, salt);
    connection.query("INSERT INTO `ballotBuddy`.`users` (`email`,`firstName`,`lastName`,`pass`,`state`,`user_type`, `salt`) VALUES ('" + newUser.email + "', '" + newUser.firstName + "', '" + newUser.lastName + "', '" + newPass + "', '" + newUser.state + "', '" + newUser.user_type + "', '"+ salt +"');",
        function(err, res) {
            if (err){
                result(err, null);
            }
            else {
                result(null, {"code": 200});
            }
    });
};

//login user
User.login = function(user, result) {
    connection.query("SELECT * from `ballotBuddy`.`users` WHERE email=? AND `id` NOT IN (SELECT `id` from `ballotBuddy`.`profiles` WHERE `inactive`=1)", [user.email], 
    function(err, res) 
    {
        if(err)
        {
            result(err, null);
        }
        else 
        { 
            if(res.length > 0)
            {
                var salt, newPass = sha224(user.pass, res[0].salt);
                if(res[0].pass == newPass)
                {
                    result({"code":200});
                }
                else 
                {
                result({"code":204, "response":"Incorrect password"}, null);
                } 
            }
            else
            {
            result({"code":204, "response":"Incorrect email"}, null);
            }
        }
    });
};


//update user
//
User.editProfile = function(user, result) {
    connection.query("UPDATE ");

};
    // - first name
    // - last name
    // - profile picture
    // - tags
    // - state

//delete user -- marking them as inactive
User.deleteProfile = function(user, result) {
    connection.query("UPDATE `ballotBuddy`.`profiles` SET inactive=1 WHERE `profiles`.`id` IN ( SELECT id from `ballotBuddy`.`users` WHERE email = ?)", [user.email], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else 
        {
            result({"code":200, "response":"user deactivated"});
        }
    });
};

//get all users

//get user by name -- search basically
// see what harrison is sending  to me
User.search = function(user, result) {
    connection.query("SELECT firstName, lastName FROM `ballotBuddy`.`users` WHERE firstName=? AND ",
    function(err, res)
    {

    });

};

module.exports = User;