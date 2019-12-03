'use strict';

module.exports = function(app) {

    var userController = require('../Controller/userController.js');
    var groupController = require('../Controller/groupsController.js');
    var dbManager = require('../Controller/dbController.js');
    // var pollController = require('../Controller/pollsController.js');
    var postController = require('../Controller/postsController.js');
    var pollController = require('../Controller/pollControllers.js');
    
    app.route('/setupdb')
      .get(dbManager.setupdb);
    
    app.route('/createtags')
      .get(dbManager.setuptags);

    //USERS ROUTES
    app.get('/', function(err, result) {
     result.status(200).send("on 0.0.0.0:3000");
    });

    app.route('/login') //DONE
      .post(userController.loginUser);
      
    app.route('/register') //DONE 
      .post(userController.createUser);

    //user home
    app.route('/user/:id')
      .get(userController.getUser);

    //user update profile
    app.route('/user/update/password/:id') //DONE
      .put(userController.resetPassword);

    app.route('/user/update/firstName/:id') //DONE
      .put(userController.changeFirstName);

    app.route('/user/update/lastName/:id') //DONE
      .put(userController.changeLastName);

    app.route('/user/update/state_residence/:id')
      .put(userController.changeStateResidence);

    app.route('/user/update/email/:id') //DONE
      .put(userController.changeEmail);

    app.route('/user/update/deleteProfile/:id')
      .put(userController.deleteProfile);

    app.route('/user/search')
      .post(userController.searchUsers);


    //user posts routes
    app.route('/user/newPost/:id')
      .post(postController.createPost);

    app.route('/user/newPost/addTags/:id')
      .put(postController.addTags);

    app.route('/user/editPost/:id')
      .put(postController.editPost);


    //user polls routes
    app.route('/user/newPoll/:creator_id')
      .post(pollController.createPoll);
    
    app.route('/user/newPoll/addTags/:creator_id')
      .put(pollController.addTags);
    
    app.route('/user/newPoll/addOption/:poll_id')
      .put(pollController.addOption);

    app.route('/user/updateAnswerCount/:poll_id')
      .put(pollController.updateAnswerCount);

      app.route('/user/deletePoll/:poll_id')
      .put(pollController.deletePoll);
};