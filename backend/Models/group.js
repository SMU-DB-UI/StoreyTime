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
Group.inviteMembers = function(newMember, joinedGroup, result) {
    connection.query("INSERT INTO `ballotBuddy`.`group_members_bridge` VALUES ('"+ joinedGroup.group_id +"','" + newMember.id +"');",
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {

        }
    });
};


Group.removeMembersFromGroup = function(member_id,group_id,result) {
    sql.query("DELETE FROM `ballotBuddy`.`group_members_bridge` WHERE member_id = ? AND group_id = ?", [member_id,group_id],
    function(err,res){
        if (err){
            result(err, null);
          }else{
            result(null,{
                "code":200,
                "response":"Member deletion completed."
            });
          }
    });
};

Group.removeGroup = function(group_id,result) {
    sql.query("UPDATE `ballotBuddy`.`groups` SET `inactive` = 1 WHERE group_id = ?", [group_id],
    function(err,res){
        if (err){
            result(err, null);
          }else{
            result(null,{
                "code":200,
                "response":"Group deletion completed."
            });
          }
    });
};

module.exports = Group;
