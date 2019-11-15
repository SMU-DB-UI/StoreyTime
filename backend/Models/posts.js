'use strict';

var connection = require('./db.js');

var Post = function(post) {
    this.id = post.id;
    this.creator_id = post.creator_id;
    this.tag_id1 = post.tag_id1;
    this.tag_id2 = post.tag_id2;
    this.tag_id3 = post.tag_id3;
    this.date_created = post.date_created;
    this.title = post.title;
    this.post_text = post.post_text;
};

Post.createPost = function(newPost, result)
{
    connection.query("INSERT INTO `ballotBuddy`.`posts` (`creator_id`, `tag_id1`, `tag_id2`, `tag_id3`, `date_created`, `title`, `post_text`) VALUES ('"+ newPost.creator_id +"', '"+ newPost.tag_id1 +"', '"+ newPost.tag_id2 +"', '"+ newPost.tag_id3 +"', '"+ newPost.date_created +"', '"+ newPost.title +"', '"+ newPost.post_text +"');",
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
