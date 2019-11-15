
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
    //var newValue = utf16.stringify(value);
    return {
        salt:salt,
        passwordHash:value
    };
};

//copy user
var User = function(user){
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.pass = user.pass;
    this.salt = user.salt;
    this.user_type = user.user_type;
    this.state_residence = user.state_residence;
    this.date_joined = user.date_joined;
    this.inactive = user.inactive;
}

//after registration, should redirect to setupProfile page to add picture, tags, etc
User.createUser = function(newUser, result) {
    var salt = salter(16);
    var salt, newPass = sha224(newUser.pass, salt);
    connection.query("INSERT INTO `ballotBuddy`.`users` (`firstName`,`lastName`,`email`,`pass`,`salt`,`user_type`, `state_residence`, `date_joined`, `inactive`) VALUES ('" + newUser.firstName + "','" + newUser.lastName + "','" + newUser.email + "','" + newPass.passwordHash + "','"+ salt +"','" + newUser.user_type + "','" + newUser.state_residence + "','"+ newUser.date_joined +"', '"+ 0 +"');",
        function(err, res) {
            if (err){
                result(err, null);
            }
            else {
                result(null, {"code":200});
            }
    });
};

//login user
User.login = function(user, result) {
    connection.query("SELECT * from `ballotBuddy`.`users` WHERE email=? AND `id` NOT IN (SELECT `id` from `ballotBuddy`.`users` WHERE `inactive`=1)", [user.email], 
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
                if(res[0].pass == newPass.passwordHash)
                {
                    //how to start a session object!
                    result(null, {"code":200, "firstName": res[0].firstName, "lastName": res[0].lastName, "email": res[0].email, "id": res[0].id, "user_type": res[0].user_type, "state_residence":res[0].state_residence });
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

User.getUser = function(id, result) {
    connection.query("SELECT * FROM `ballotBuddy`.`users` WHERE id = ?", [id],
    function(err, res) {
        if(err)
        {
            result(err, null);
        }
        else 
        {
            if(res.length > 0)
            {
                if(res[0].inactive != 1)
                {
                    result({"code":200});
                }
                else
                {
                    result({"code":204, "response":"Account no longer exists"});
                }
            }
            else
            {
                result({"code":204, "response":"User not found"});
            }
        }
    
    });
};

//update user
//how to do this?
User.changePassword = function(id, pass, result) {
    var salt = salter(16);
    var salt, newPass = sha224(pass, salt);
    connection.query("UPDATE `ballotBuddy`.`users` SET pass = ? WHERE id = ?;", [id, newPass], 
    function(err, res) 
    {
        if(err)
        {
            result(err, null);
        }
        else 
        {
            result(null, {"code":200});
        }

    });
};

User.updateFirstName = function(id, firstName, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET firstName = ? WHERE id = ?", [id, firstName], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};

User.updateLastName = function(id, lastName, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET lastName = ? WHERE id = ?", [id, lastName], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};

User.updateEmail = function(id, email, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET email = ? WHERE id = ?", [id, email], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};



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
    connection.query("SELECT firstName, lastName FROM `ballotBuddy`.`users` WHERE firstName LIKE",
    function(err, res)
    {

    });
};

module.exports = User;