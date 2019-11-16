'use strict';

var connection = require('./db.js');

var Post = function(post) {
    this.post_id = post.post_id;
    this.creator_id = post.creator_id;
    this.tag_id1 = post.tag_id1;
    this.tag_id2 = post.tag_id2;
    this.tag_id3 = post.tag_id3;
    this.date_created = post.date_created;
    this.title = post.title;
    this.post_text = post.post_text;
};

Post.createPost = function(creator_id, newPost, result)
{
    connection.query("INSERT INTO `ballotBuddy`.`posts` (`creator_id`, `tag_id1`, `tag_id2`, `tag_id3`, `date_created`, `title`, `post_text`) VALUES ('"+ creator_id +"', '"+ newPost.tag_id1 +"', '"+ newPost.tag_id2 +"', '"+ newPost.tag_id3 +"', '"+ newPost.date_created +"', '"+ newPost.title +"', '"+ newPost.post_text +"');",
    function(err, res)
    {
        if(err)
        {
           result(err, null);
        }
        else
        {
            connection.query("SELECT MAX(`post_id`) FROM `ballotBuddy`.`posts` WHERE `creator_id` = ?", [creator_id],
            function(err, res1)
            {
                if(res1.length > 0 )
                {
                    result(null, {"code":200, "post_id": res1[0].post_id, "creator_id": creator_id});
                }
                else
                {
                    result(err, null);
                }
            });  
        }
    });
};

Post.editText = function(post_id, creator_id, newText, result) {
    connection.query("UPDATE `ballotBuddy`.`posts` SET post_text = ? WHERE post_id = ? AND creator_id = ?", [newText, post_id, creator_id], 
    function(err, res)
    {
        if(err)
        {
            res.send(err, null);
        }
        else
        {
            res.send(null, {"code":200, "post_id":post_id, "post_text": newText});
        }
    }); 
};

module.exports = Post;
