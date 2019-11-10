'use strict';

module.exports = function(app) {

    var userController = require('../Controller/userController.js');
    // var groupController = require('../Controller/groupsController.js');
    // var pollController = require('../Controller/pollsController.js');
    // var postController = require('../Controller/postsController.js');
    
    //USER LOGIN/REGISTER
    app.route('/login')
      .post(userController.loginUser);
      
    app.route('/register')
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


    //POST
    app.post('/reg', function(request, response) {
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
          var email = request.body.email;
        var password = request.body.password;
        // var hashed_hex = crypto.createHash('sha224', password);
        // var hashed_password = hashed_hex.digest('string');
          if (email && password) {
            connection.query('insert into users values (0, ?, ?, ?, ?)', [firstname, lastname, email, password], function(error, results, fields) {
            if(error)
            {
              logger.error( error.message )
            }
            request.session.loggedin = true;
                  request.session.username = email;
            response.redirect('/home');
              });
          } else {
              response.send('Please enter Email and Password!');
              response.end();
          }
      });
      
      //POST for LOGIN
    app.post('/auth', function(request, response) {
        var email = request.body.email;
        var password = request.body.password;
        // var hashed_hex = crypto.createHash('sha224', password);
        // var hashed_password = hashed_hex.digest('string');
          if (email && password) {
              connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, hashed_password], function(error, results, fields) {
                  if (results.length > 0) {
              logger.info(results)
              request.session.loggedin = true;
                      request.session.username = results.body.firstName;
                      response.redirect('/home');
                  } else {
              //something about incorrect password or username
              return res.status(400).send({ 
                message : "Wrong Password"
              });
                  }			
                  response.end();
              });
          } else {
              response.send('Please enter Email and Password!');
              response.end();
          }
      });

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