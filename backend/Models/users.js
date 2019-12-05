
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
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var date = year+ '-' + month + '-' + day;
    var salt = salter(16);
    var salt, newPass = sha224(newUser.pass, salt);
    connection.query("INSERT INTO `ballotBuddy`.`users` (`firstName`,`lastName`,`email`,`pass`,`salt`,`user_type`, `state_residence`, `date_joined`, `inactive`) VALUES ('" + newUser.firstName + "','" + newUser.lastName + "','" + newUser.email + "','" + newPass.passwordHash + "','"+ salt +"','" + newUser.user_type + "','" + newUser.state_residence + "','"+ date +"', '"+ 0 +"');",
        function(err, res) 
        {
            if (err){
                result(err, null);
            }
            else 
            {
                connection.query("SELECT id FROM `ballotBuddy`.`users` WHERE firstName=? AND lastName=? AND email=? AND salt=?", [newUser.firstName, newUser.lastName, newUser.email, salt],
                function(err1, res1)
                {
                    if(err1)
                    {
                        result(err1, null);
                    }
                    else
                    {
                        result(null, {"code":200, "id":res1[0].id});
                    }

                });  
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

User.getPoliticians = function(result)
{
    connection.query("SELECT U.id, U.firstName, U.lastName, U.state_residence, P.politician_type, P.office_email, P.office_phone, P.inactive from `ballotBuddy`.`politicians` as P join (SELECT id, firstName, lastName, state_residence FROM `ballotBuddy`.`users`) as U ON P.user_id = U.id;", 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, res);
        }
    });
};

User.getTagsFollowing = function(id, result)
{
    connection.query("SELECT `tag_word` FROM `ballotBuddy`.`tags` WHERE tag_id in (SELECT `tag_id` from `ballotBuddy`.`tags_users_bridge` WHERE users_id = ?)", [id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, res});
        }
    });
};

User.followTag = function(id, tag_word, result)
{
    connection.query("SELECT * FROM `ballotBuddy`.`tags` WHERE tag_word = ?", [tag_word],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            connection.query("INSERT INTO `ballotBuddy`.`tags_users_bridge` (users_id, tag_id) VALUES ('"+ id +"', '"+res[0].tag_id +"');",
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else
                {
                    result(null, {"code":200});
                }
            });
        }
    });
};

User.unfollowTag = function(id, tag_word, result)
{
    connection.query("SELECT * FROM `ballotBuddy`.`tags` WHERE tag_word = ?", [tag_word],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            connection.query("Update `ballotBuddy`.`tags_users_bridge` set inactive = 1 WHERE users_id=? AND tag_id=?", [id, res[0].tag_id],
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else
                {
                    result(null, {"code":200});
                }
            });
        } 
    });
};

User.getPollsFeed = function(id, result)
{
    connection.query("select `id`, `firstName`, `lastName`, `question`, `date_created`, `poll_id`, I, group_concat(distinct `tag_word`), group_concat(distinct `answer_count`), group_concat(distinct `answer_text`) from `ballotBuddy`.`users` as U join ( select `tag_word`, `poll_id`, `creator_id`, `date_created`, `question`, `inactive` as I, `answer_text`, `answer_count` from `ballotBuddy`.`polls_answers` as PO join ( select `tag_word`, `poll_id` as pID, `creator_id`, `date_created`, `question`, `inactive` from `ballotBuddy`.`tags` as T join ( select `tag_id`, `poll_id`,`creator_id`, `date_created`, `question`, `inactive` from `ballotBuddy`.`polls` as P join ( select `tag_id`, `poll_id` as P_ID FROM `ballotBuddy`.`tags_polls` where tag_id in ( select `tag_id` from `ballotBuddy`.`tags_users_bridge` where users_id=? )) as Tags on P.poll_id = Tags.P_ID) as Poll on T.tag_id = Poll.tag_id) as po on PO.poll_id = po.pID ) as OP on U.id = OP.creator_id group by poll_id order by date_created desc;", [id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, res});
        }
    });
};

User.getPostsFeed = function(id, result)
{
    connection.query("select `id`, `firstName`, `lastName`, `title`, `post_text`, `date_created`, I,`post_id`, group_concat(distinct `tag_word`) from `ballotBuddy`.`users` as U join (select `tag_word`, `post_id`, `creator_id`, `date_created`, `title`, `post_text`, `inactive` as I from `ballotBuddy`.`tags` as T join (select `tag_id`, `post_id`, `creator_id`, `date_created`, `title`, `post_text`, `inactive` from `ballotBuddy`.`posts` as P join (select `tag_id`, `post_id` as P_ID FROM `ballotBuddy`.`tags_posts` where tag_id in (select `tag_id` from `ballotBuddy`.`tags_users_bridge` where users_id=? )) as Tags on P.post_id=Tags.P_ID) as Post on T.tag_id = Post.tag_id) as OP on U.id = OP.creator_id group by post_id order by date_created desc;", [id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, res);
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
            if(res.length != 0)
            {
                if(res[0].inactive != 1)
                {
                    result({"code":200, "firstName": res[0].firstName, "lastName": res[0].lastName, "email": res[0].email, "id": res[0].id, "user_type": res[0].user_type, "state_residence":res[0].state_residence });
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

User.changePassword = function(id, pass, result) {
    var salt = salter(16);
    var salt, newPass = sha224(pass, salt);
    connection.query("UPDATE `ballotBuddy`.`users` SET pass = ?, salt = ? WHERE id = ?;", [newPass.passwordHash, salt, id], 
    function(err, res) 
    {
        if(err)
        {
            result(err, null);
        }
        else 
        {
            result(null, {"code":200, "pass": pass});
        }

    });
};

User.updateFirstName = function(id, firstName, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET firstName = ? WHERE id = ?", [firstName, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "firstName": firstName});
        }
    });
};

User.updateLastName = function(id, lastName, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET lastName = ? WHERE id = ?", [lastName, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "lastName": lastName});
        }
    });
};

User.updateState = function(id, state_residence, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET state_residence = ? WHERE id = ?", [state_residence, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else 
        {
            result(null, {"code":200, "state_residence": state_residence});
        }
    });
};

User.updateEmail = function(id, email, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET email = ? WHERE id = ?", [email, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "email": email});
        }
    });
};


//delete user -- marking them as inactive
User.deleteProfile = function(id, result) {
    connection.query("UPDATE `ballotBuddy`.`users` SET inactive=1 WHERE id = ?", [id], 
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
User.search = function(firstName, lastName, result) {
    connection.query("SELECT firstName, lastName, user_type, state_residence FROM `ballotBuddy`.`users` WHERE firstName = ? AND lastName = ? AND id NOT IN (SELECT `id` from `ballotBuddy`.`users` WHERE `inactive`=1)", [firstName, lastName], 
    function(err, res)
    {
        if(res.length == 0)
        {
            connection.query("SELECT firstName, lastName, user_type, state_residence FROM `ballotBuddy`.`users` WHERE firstName = ? OR lastName = ? AND id NOT IN (SELECT `id` from `ballotBuddy`.`users` WHERE `inactive`=1)", [firstName, lastName], 
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else
                {
                    result(null, res1);
                    //how to send back all ?
                }
            });
        }
        else
        {
            result(null, res);
        }
    });
};

module.exports = User;