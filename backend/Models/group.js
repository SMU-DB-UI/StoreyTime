'use strict';

var connection = require('./db.js');

var Group = function(group) {
    this.group_id = group.group_id;
    this.creator_id = group.creator_id;
    this.group_name = group.group_name;
    this.inactive = group.member_count;
};

Group.createGroup = function(creator_id, newGroup, result) {
    var name = connection.escape(newGroup.group_name);
    connection.query("INSERT INTO `ballotBuddy`.`groups` (`creator_id`, `group_name`, `inactive`) VALUES ('"+ creator_id +"','"+ name +"','"+ 0 +"');",
    function(err, res)
    {
        if (err)
        {
            result(err, null);
        }
        else 
        {
            connection.query("SELECT MAX(`group_id`) FROM `ballotBuddy`.`groups` WHERE creator_id = ?", [newGroup.creator_id], 
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else 
                {
                    result(null, {"code":200, "group_id": res1[0]['MAX(`group_id`)'], "creator_id": newGroup.creator_id});
                }
            });
        }
    });
};

//this is a combination of search and add
Group.findMembers = function(firstName, lastName, result) {
    connection.query("SELECT id, firstName, lastName, state_residence, date_joined from `ballotBuddy`.`users` WHERE `firstName` = ? AND `lastName` = ? AND `inactive`=0", [firstName, lastName], 
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

Group.inviteMembers = function(member_id, group_id, result)
{
    connection.query("INSERT INTO `ballotBuddy`.`groups_members_bridge` (`group_id`, `member_id`, `inactive`) VALUES ('"+ group_id +"', '"+ member_id +"', '"+ 0 +"' );",
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "group_id": group_id});
        }
    });
};


Group.removeMembersFromGroup = function(member_id,group_id,result) {
    connection.query("UPDATE `ballotBuddy`.`groups_members_bridge` SET `inactive` = 1 WHERE member_id = ? AND group_id = ?", [member_id,group_id],
    function(err,res){
        if (err){
            result(err, null);
          }else{
            result(null,{
                "code":200
            });
          }
    });
};

Group.deleteGroup = function(group_id,result) {
    connection.query("UPDATE `ballotBuddy`.`groups` SET `inactive` = 1 WHERE group_id = ?", [group_id],
    function(err,res){
        if (err){
            result(err, null);
          }else{
            result(null,{
                "code":200
            });
          }
    });
};


Group.selectNewAdmin = function(group_id, firstName, lastName, result) {
    connection.query("SELECT id, firstName, lastName from `ballotBuddy`.`users` WHERE id IN (SELECT member_id FROM groups_members_bridge WHERE group_id = ? AND inactive = 0) AND firstName = ? AND lastName = ?", [group_id, firstName, lastName],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code": 200, res});
        }
    });
};

Group.setNewAdmin = function(group_id, member_id, result) {
    var d = new Date;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var date = year+ '-' + month + '-' + day;
    connection.query("UPDATE `ballotBuddy`.`groups_admins` SET current = 0 WHERE group_id = ?", [group_id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            connection.query("INSERT INTO `ballotBuddy`.`groups_admins` (`group_id`, `admin_id`, `current`, `date_added`) VALUES ( '"+ group_id +"', '"+ member_id +"', '"+ 1 +"', '"+ date +"');", 
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

module.exports = Group;
