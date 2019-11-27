'use strict';

module.exports = function(app) {

    var userController = require('../Controller/userController.js');
    var groupController = require('../Controller/groupsController.js');
    var dbManager = require('../Controller/dbController.js');
    var pollController = require('../Controller/pollController.js');
    var postController = require('../Controller/postsController.js');
    var commentController = require('../Controller/commentsController.js');
    
// ========== set-up endpoints ========== //
    app.route('/setupdb')
      .get(dbManager.setupdb);
    
    app.route('/createtags')
      .get(dbManager.setuptags);

    app.get('/', function(err, result) {
      result.status(200).send("on 0.0.0.0:3000");
     });

// =========== user ============== //

    app.route('/login') //DONE
      .post(userController.loginUser);
      
    app.route('/register') //DONE 
      .post(userController.createUser);

    app.route('/user/:id') //DONE
      .get(userController.getUser);

    app.route('/user/update/password/:id') //DONE
      .put(userController.resetPassword);

    app.route('/user/update/firstName/:id') //DONE
      .put(userController.changeFirstName);

    app.route('/user/update/lastName/:id') //DONE
      .put(userController.changeLastName);

    app.route('/user/update/state_residence/:id') //DONE
      .put(userController.changeStateResidence);

    app.route('/user/update/email/:id') //DONE
      .put(userController.changeEmail);

    app.route('/user/update/deleteProfile/:id') //DONE
      .put(userController.deleteProfile);

    app.route('/user/search') //DONE
      .post(userController.searchUsers);

// =========== posts routes ================ //
    app.route('/user/newPost/:id') //DONE
      .post(postController.createPost);

    app.route('/user/newPost/addTags/:id') //DONE
      .put(postController.addTags);

    app.route('/user/editPost/:id') //DONE
      .put(postController.editPost);

    app.route('/user/deletePost/:id') //DONE
      .put(postController.deletePost);

// =========== comments routes ================ //
    app.route('/user/home/newComment/:post_id')
      .post(commentController.createComment);

    app.route('/user/home/editComment/:comment_id')
      .put(commentController.editComment);

    app.route('/user/home/deleteComment/:comment_id')
      .put(commentController.deleteComment);

// ========== polls routes =============== //
    app.route('/user/newPoll/:id')
      .post(pollController.createPoll);

// ========== groups posts routes ============ //
    app.route('/user/groups/createNewGroup/:id') //DONE
      .post(groupController.createGroup);

    app.route('/user/groups/searchForNewMembers') //DONE
      .post(groupController.findMembers);

    app.route('/user/group/addNewMembers/:group_id') //DONE
      .post(groupController.inviteMembers);

    app.route('/user/group/removeMember/:group_id')
      .put(groupController.removeUserFromGroup);
    
    app.route('/user/group/deleteGroup/:group_id')
      .put(groupController.deleteGroup);


};