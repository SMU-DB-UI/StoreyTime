var Comment = require('../Models/comments.js');

exports.createComment = function(request, result)
{
    if(! request.body.post_id)
    {
        result.status(400).json({"code":400, "response": "Missing post id in body"});
    }
    else 
    {
        var newComment = new Comment(request.body);
        Comment.createComment(newComment, function(err, comment)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(comment);
            }
        });
    }
};

exports.editComment = function(request, result)
{
    if(!request.params.comment_id)
    {
        result.status(400).json({"code":400, "response": "Missing comment id in request params"});
    }
    else
    {
        Comment.editComment(request.params.comment_id, request.body.comment_text, function(err, comment)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(comment);
            }
        });
    }
};

exports.deleteComment = function(request, result)
{
    if(!request.params.comment_id)
    {
        result.status(400).json({"code":400, "response": "Missing comment id in request params"});
    }
    else if(! request.body.creator_id)
    {
        result.status(400).json({"code":400, "response": "Missing creator id in request body"});
    }
    else
    {
        Comment.deleteComment(request.params.comment_id, request.body.creator_id, function(err, comment)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(comment);
            }
        });
    }
};

