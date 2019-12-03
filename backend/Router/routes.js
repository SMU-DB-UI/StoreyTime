'use strict';

module.exports = function(app) {

    var userController = require('../Controller/userController.js');
    var politicianController = require('../Controller/politicianController.js');
    var groupController = require('../Controller/groupsController.js');
    var dbManager = require('../Controller/dbController.js');
    var pollController = require('../Controller/pollController.js');
    var postController = require('../Controller/postsController.js');
    var commentController = require('../Controller/commentsController.js');
    var eventController = require('../Controller/eventsController.js');
    
// ========== set-up endpoints ========== //
    app.route('/setupdb')
      .get(dbManager.setupdb);
    
    app.route('/createtags')
      .get(dbManager.setuptags);

// =========== user ============== //

    app.route('/login') //DONE
      .post(userController.loginUser);
      
    app.route('/register') //DONE 
      .post(userController.createUser);

    app.route('/user/:id') //DONE
      .get(userController.getUser);

    app.route('/postsHome/:id') //DONE
      .get(userController.getPostsFeed);

    app.route('/getPoliticians') //DONE
      .get(userController.getPoliticians);

    app.route('/user/followTag/:id') //DONE
      .post(userController.followTag);

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

// =========== politician routes ============== //
    app.route('/register/politician') //DONE
      .post(politicianController.createPolitician);

    app.route('/user/politician/updateOfficePhone/:id') //DONE
      .put(politicianController.updatePhone);

    app.route('/user/politician/updateOfficeEmail/:id') //DONE
      .put(politicianController.updateEmail);

    app.route('/user/politician/updatePoliticianType/:id') //DONE
      .put(politicianController.updatePoliticianType);

    app.route('/user/politician/setAsInactive/:id') //DONE
      .put(politicianController.setInactive);

// =========== posts routes ================ //
    app.route('/user/newPost/:id') //DONE
      .post(postController.createPost);

    app.route('/user/getPost/:post_id') //DONE
      .get(postController.getPost);

    app.route('/getAllPosts')
      .get(postController.getPosts);

    app.route('/user/newPost/addTags/:id') //DONE
      .put(postController.addTags);

    app.route('/user/editPost/:id') //DONE
      .put(postController.editPost);

    app.route('/user/deletePost/:id') //DONE
      .put(postController.deletePost);

// =========== comments routes ================ //
    app.route('/user/home/newComment/:post_id') //DONE
      .post(commentController.createComment);

    app.route('/user/home/editComment/:comment_id') //DONE
      .put(commentController.editComment);

    app.route('/user/home/deleteComment/:comment_id') //DONE
      .put(commentController.deleteComment);

// ========== polls routes =============== //
    app.route('/user/newPoll/:creator_id') //DONE
      .post(pollController.createPoll);

    app.route('/user/newPoll/addTag/:creator_id') //DONE
      .put(pollController.addTag);

    app.route('/user/newPoll/addOption/:poll_id') //DONE
      .put(pollController.addOption);

    app.route('/user/updateAnswerCount/:poll_id') //DONE
      .put(pollController.updateAnswerCount);

    app.route('/user/deletePoll/:poll_id') //DONE
      .put(pollController.deletePoll);

// ========== groups routes ============ //
    app.route('/user/groups/createNewGroup/:id') //DONE
      .post(groupController.createGroup);

    app.route('/user/groups/searchForNewMembers') //DONE
      .get(groupController.findMembers);

    app.route('/user/group/addNewMembers/:group_id') //DONE
      .post(groupController.inviteMembers);

    app.route('/user/group/removeMember/:group_id') //DONE
      .put(groupController.removeUserFromGroup);

    app.route('/user/group/selectNewAdmin/:group_id') //DONE
      .get(groupController.selectNewAdmin);

    app.route('/user/group/setNewAdmin/:group_id') //DONE
      .post(groupController.setNewAdmin);
    
    app.route('/user/group/deleteGroup/:group_id') //DONE
      .put(groupController.deleteGroup);

// ============ events routes ============= //
    app.route('/user/group/createEvent/:group_id')
      .post(eventController.createEvent);

    app.route('user/group/events/:event_id')
      .get(eventController.getEvent);

    app.route('user/group/events/editDate/:event_id')
      .put(eventController.updateEventTime);

    app.route('user/group/events/editDesc/:event_id')
      .put(eventController.updateEventDesc);

};