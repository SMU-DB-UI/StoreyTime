var Post = require('../Models/posts.js');

exports.createPost = function(request, result) {
    var newPost = new Post(request.body);
    Post.createPost(newPost, function(err, post)
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