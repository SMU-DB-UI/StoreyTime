'use strict';

module.exports = function(app) {

    var userController = require('../Controller/userController.js');
    var groupController = require('../Controller/groupsController.js');
    // var pollController = require('../Controller/pollsController.js');
    var postController = require('../Controller/postsController.js');
    
    //USER 
    app.get('/', function(err, result) {
     result.status(200).send("on 0.0.0.0:3000");
    });

    app.route('/login')
      .post(userController.loginUser);
      
    app.route('/register')
      .post(userController.createUser);

    //user home
    app.route('/user/:id')
      .get();

    //update password
    app.route('/user/update/pasword/:id')
      .put(userController.updateUser);

    //update names
    app.route('/user/update/firstName/:id')
      .put(userController.changeFirstName);

    app.route('/user/update/lastName/:id')
      .put(userController.changeLastName);

    //update email
    app.route('/user/update/email/:id')
      .put(userController.changeEmail);

};