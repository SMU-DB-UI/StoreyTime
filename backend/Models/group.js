'use strict';

var sql = require('./db.js');

var Group = function(group) {
    this.group_id = group.group_id;
    this.creator_id = group.creator_id;
    this.group_name = group.group_name;
    this.member_count = group.member_count;
};

var GroupMembersBridge = function(GMB){
    this.group_id = GMB.group_id;
    this.member_id = GMB.member_id;
};

Group.createGroup = function(newGroup, result) {
    sql.query("INSERT INTO `ballotBuddy`.`groups` (`group_id`, `creator_id`, `group_name`, `member_count`) VALUES ('"+ newGroup.group_id +"','"+ newGroup.creator_id +"','"+ newGroup.group_name +"','"+ newGroup.member_count +"');",
    function(err, res)
    {
        if (err)
        {
            result(err, null);
        }
        else 
        {
            result(null,{"code":200,"response":"Group creation successful."});
        }
    });
};

//this is a combination of search and add
Group.inviteMembers = function(newMember, joinedGroup, result) {
    sql.query("INSERT INTO `ballotBuddy`.`group_members_bridge` VALUES ('"+ joinedGroup.group_id +"','" + newMember.id +"');",
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null,{"code":200,"response":"Member invited successfully."})
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
                "code":201,
                "response":"Member deletion completed."
            });
          }
    });
};

Group.removeGroup = function(group_id,result) {
    sql.query("DELETE FROM `ballotBuddy`.`group_members_bridge` WHERE group_id = ?", [group_id],
    function(err,res){
        if (err){
            result(err, null);
          }else{
            result(null,{
                "code":201,
                "response":"Group deletion completed."
            });
          }
    });
};

module.exports = Group;
