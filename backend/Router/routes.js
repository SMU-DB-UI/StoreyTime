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

    app.get('/login', function(err, result) {
      //send page
    });

    app.get('/register', function(err, result) {

    });

    app.route('/loginAuth')
      .post(userController.loginUser);
      
    app.route('/registerAuth')
      .post(userController.createUser);

    //USER UPDATE
    app.route('/updateProfile/:user_id')
      .put(userController.updateUser);

    // app.get('/home', function(request, response) {
    //     if (request.session.loggedin) {
    //     logger.info(request.session);
    //         response.send('Welcome back, ' + request.session.username + '!');
    //     } else {
    //         response.send('Please login to view this page!');
    //     }
    //     response.end();
    //});

 
// app.post('/search', function(request, response) {
//   var name = request.body.fullName;
//   if(name)
//   {
//     connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, hashed_password], function(error, results, fields) {
// 			if (results.length > 0) {
//         logger.info(results)
//         request.session.loggedin = true;
// 				request.session.username = results.body.firstName;
// 				response.redirect('/home');
// 			} else {
//         //something about incorrect password or username
//         return res.status(400).send({ 
//           message : "Wrong Password"
//         });
//   }
// });

};