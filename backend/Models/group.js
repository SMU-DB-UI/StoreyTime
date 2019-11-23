'use strict';

var connection = require('./db.js');

var Group = function(group) {
    this.group_id = group.group_id;
    this.creator_id = group.creator_id;
    this.group_name = group.group_name;
    this.member_count = group.member_count;
};

Group.createGroup = function(newGroup, result) {
    connection.query("INSERT INTO `ballotBuddy`.`groups` (`creator_id`, `group_name`, `member_count`) VALUES ('"+ newGroup.creator_id +"','"+ newGroup.group_name +"','"+ 0 +"');",
    function(err, res)
    {
        if (err)
        {
            result(err, null);
        }
        else 
        {
            connection.query("SELECT MAX(group_id) FROM `ballotBuddy`.`groups` WHERE creator_id = ?", [newGroup.creator_id], 
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else 
                {
                    result(null, {"code":200, "group_id": res1[0].group_id, "creator_id": newGroup.creator_id});
                }
            });
        }
    });
};

//this is a combination of search and add
Group.findMembers = function(firstName, lastName, result) {
    connection.query("SELECT id from `ballotBuddy`.`users` WHERE `firstName` = ? AND `lastName` = ?", [firstName, lastName], 
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
    sql.query("UPDATE `ballotBuddy`.`group_members_bridge` SET `inactive` = 1 WHERE member_id = ? AND group_id = ?", [member_id,group_id],
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
    sql.query("UPDATE `ballotBuddy`.`groups` SET `inactive` = 1 WHERE group_id = ?", [group_id],
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

Group.selectNewAdmin = function(group_id, member_id, result) {

};

Group.setNewAdmin = function(group_id, member_id, result) {

};

module.exports = Group;
