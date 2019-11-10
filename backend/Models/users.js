
;'use strict';

var connection = require('./db.js');

//copy user
var User = function(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.user_type = user.user_type;
    this.state = user.state;
};

//create user
//newUser in controller
//after registration, should redirect to setupProfile page to add picture, tags, etc
User.createUser = function(newUser, result) {
    connection.query( "INSERT INTO ballotBuddy.users VALUES (0, ' newUser.firstName ', ' newUser.lastName', 'newUser.email', 'newUser.password', 'newUser.user_type', 'newUser.state');" )
     {
        if (err)
        {
            result(err, null);
        }
        else 
        {
            //send a 200 status code
        }
    }

};

//login user
User.login = function(user, result) {
    //connection.query("SELECT ")

};


//update user
User.editProfile = function(user, result) {
    connection.query("");

};
    // - first name
    // - last name
    // - profile picture
    // - tags
    // - state

//delete user -- marking them as inactive
//set

User.deleteProfile = function(user, result) {
    connection.query("");
    //set inactive status as true/1
};

//get all users

//get user by name -- search basically

User.search = function(user, result) {
    connection.query("SELECT firstName, lastName, ");


};
