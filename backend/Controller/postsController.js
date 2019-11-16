var Post = require('../Models/posts.js');

exports.createPost = function(request, result) {
    if(! request.params.user_id)
    {
        result.status(400).json({"code":400, "response":"Missing user ID in params"});
    }
    var newPost = new Post(request.body);
    Post.createPost(request.params.user_id, newPost, function(err, post)
    {
        if(err)
        {
            result.send(err);
        }
        else
        {
            result.json(post);
        }
    });
};

exports.editPost = function(request, result) {
    if( ! request.params.post_id)
    {
        result.status(400).json({"code":400, "response":"Missing post ID in params"});
    }
    else if(! request.params.creator_id)
    {
        result.status(400).json({"code":400, "response":"Missing user ID in body"});
    }
    else if(! request.body.post_text)
    {
        result.status(400).json({"code":400, "response":"Missing text in body"});
    }
    else 
    {
        Post.editText(request.params.post_id, request.params.creator_id, request.body.post_text, function(err, post)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(post);
            }
        });
    }
};