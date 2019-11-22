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
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var date = year+ '-' + month + '-' + day;
    connection.query("INSERT INTO `ballotBuddy`.`posts` (`creator_id`, `date_created`, `title`, `post_text`) VALUES ('"+ creator_id +"', '"+ date +"', '"+ newPost.title +"', '"+ newPost.post_text +"');",
    function(err1, res1)
    {
        if(err1)
        {
            result(err1, null);
        }
        else
        {
            connection.query("SELECT MAX(`post_id`) FROM `ballotBuddy`.`posts` WHERE `creator_id` = ?", [creator_id],
            function(err2, res2)
            {
                if(res2.length > 0 )
                {
                    console.log(res2);
                    result(null, {"code":200, "post_id": res2[0].post_id, "creator_id": creator_id});
                }
                else
                {
                    result(err2, null);
                }
            });  
        }
    });
};

Post.addTags = function(post_id, creator_id, tag_words, result)
{
    connection.query("SELECT tag_id FROM `ballotBuddy`.`tags` WHERE `tag_word` = ? OR `tag_word` = ? OR `tag_word`=? ", [tag_words[0], tag_words[1], tag_words[2] ], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            connection.query("UPDATE `ballotBuddy`.`posts` SET tag_id1 = ?, tag_id2 = ?, tag_id3 = ? WHERE post_id = ? AND creator_id = ?", [res[0].tag_id, res[1].tag_id, res[2].tag_id, post_id, creator_id], 
            function(err1, res1)
            {
                if(err1)
                {
                    result(err1, null);
                }
                else
                {
                    result(null, {"code":200, "post_id": post_id, "id": creator_id});
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
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "post_id":post_id, "creator_id": creator_id, "post_text": newText});
        }
    }); 
};

Post.deletePost = function(post_id, result) {
    connection.query("UPDATE `ballotBuddy`.`posts` SET inactive = 1 WHERE post_id = ?", [post_id],
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

module.exports = Post;
