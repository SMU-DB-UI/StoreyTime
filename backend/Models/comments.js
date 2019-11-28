'use strict';

var connection = require('./db.js');

var Comment = function(comment)
{
    this.comment_id = comment.comment_id;
    this.creator_id = comment.creator_id;
    this.post_id = comment.post_id;
    this.comment_text = comment.comment_text;
    this.date_created = comment.date_created;
    this.inactive = comment.inactive;
};

Comment.createComment = function(newComment, result)
{
    var d = new Date;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    var date = year+ '-' + month + '-' + day + ' ' + time;
    connection.query("INSERT INTO `ballotBuddy`.`comments` (`creator_id`, `post_id`, `comment_text`, `date_created`, `inactive`) VALUES ('"+ newComment.creator_id+"', '"+ newComment.post_id +"', '"+ newComment.comment_text+"', '"+ date +"', '"+ 0 +"');", 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            connection.query("SELECT MAX(`comment_id`) FROM `ballotBuddy`.`comments` WHERE `creator_id` = ? AND post_id = ?", [newComment.creator_id, newComment.post_id],
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else
                {
                    result(null, {"code":200, "comment_id": res1[0].comment_id, "creator_id": newComment.creator_id, "post_id": newComment.post_id});
                }
            });
        }
    });
};

Comment.editComment = function(comment_id, comment_text, result)
{
    connection.query("UPDATE `ballotBuddy`.`comments` SET comment_text = ? WHERE comment_id = ?", [comment_text, comment_id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "comment_id":comment_id, "comment_text": comment_text});
        }
    });
};

Comment.deleteComment = function(comment_id, creator_id, result)
{
    connection.query("UPDATE `ballotBuddy`.`comments` SET `inactive` = 1 WHERE comment_id = ? AND creator_id = ?", [comment_id, creator_id],
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

module.exports = Comment;
