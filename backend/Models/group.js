'use strict';

var connection = require('./db.js');

var Group = function(group) {
    this.group_id = group.group_id;
    this.creator_id = group.creator_id;
    this.group_name = group.group_name;
    this.member_count = group.member_count;
};

Group.createGroup = function(newGroup, result) {
    connection.query("INSERT INTO `ballotBuddy`.`groups` (`group_id`, `creator_id`, `group_name`, `member_count`) VALUES ('"+ newGroup.group_id +"','"+ newGroup.creator_id +"','"+ newGroup.group_name +"','"+ newGroup.member_count +"');",
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

Group.removeMembers = function() {

};

module.exports = Group;
