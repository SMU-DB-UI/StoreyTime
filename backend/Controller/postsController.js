'use strict';

var Post = require('../Models/posts.js');

exports.createPost = function(request, result) {
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing user ID in params"});
    }
    var newPost = new Post(request.body);
    Post.createPost(request.params.id, newPost, function(err, post)
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

exports.addTags = function(request, result) {
    if( !request.body.post_id)
    {
        result.status(400).json({"code":400, "response":"Missing post ID in body"});
    }
    else if( !request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing user ID in params"});
    }
    else if(! request.body.tag_word)
    {
        result.status(400).json({"code":400, "response": "Missing tag word in body"});
    }
    else
    {
        // var words = [request.body.tag_word1, request.body.tag_word2, request.body.tag_word3];
        Post.addTags(request.body.post_id, request.params.id, request.body.tag_word, function(err, post)
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

exports.editPost = function(request, result) {
    if( ! request.body.post_id)
    {
        result.status(400).json({"code":400, "response":"Missing post ID in body"});
    }
    else if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing user ID in params"});
    }
    else if(! request.body.post_text)
    {
        result.status(400).json({"code":400, "response":"Missing text in body"});
    }
    else 
    {
        Post.editText(request.body.post_id, request.params.id, request.body.post_text, function(err, post)
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

exports.deletePost = function(request, result) {
    if(! request.body.post_id)
    {
        result.status(400).json({"code":400, "response":"Missing post ID in body"});
    }
    else
    {
        Post.deletePost(request.body.post_id, function(err, post)
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
