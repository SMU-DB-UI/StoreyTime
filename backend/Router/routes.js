'use strict';

module.exports = function(app) {

    var userController = require('../Controller/userController.js');
    var groupController = require('../Controller/groupsController.js');
    var dbManager = require('../Controller/dbController.js');
    // var pollController = require('../Controller/pollsController.js');
    var postController = require('../Controller/postsController.js');
    
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

    //update password
    app.route('/user/update/password/:id') //DONE
      .put(userController.resetPassword);

    //update names
    app.route('/user/update/firstName/:id') //DONE
      .put(userController.changeFirstName);

    app.route('/user/update/lastName/:id') //DONE
      .put(userController.changeLastName);

    app.route('/user/update/state_residence/:id')
      .put(userController.changeStateResidence);

    //update email
    app.route('/user/update/email/:id') //DONE
      .put(userController.changeEmail);

    app.route('/user/update/deleteProfile/:id')
      .put(userController.deleteProfile);

    app.route('/user/search')
      .post(userController.searchUsers);


    //POSTS routes
    app.route('/user/newPost/:id')
      .post(postController.createPost);

    app.route('/user/newPost/addTags/:id')
      .put(postController.addTags);

    app.route('/user/editPost/:id')
      .put(postController.editPost);

};