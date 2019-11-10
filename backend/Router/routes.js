'use strict';

module.exports = function(app) {


    //implement controller in here

    /**     REQUEST HANDLERS        */
    //GET /
    app.get('/', (req, res) => {
        res.status(200).send('Go to localhost:8000/setupdb');
    });
  
    //GET /setupdb
    app.get('/setupdb', (req, res) => {
        connection.query('create table if not exists users (id INT(15) AUTO_INCREMENT, firstName varchar(50), lastName varchar(50), email varchar(100), password varchar(255), PRIMARY KEY(id, email))', function (err, rows, fields) {
        if (err)
            logger.error("Can't make table " + err.message);
        else
            logger.info('table created');
        });
        res.status(200).send('created the table');
    });

    app.get('/login', function(request, response) {
        response.sendFile(path.join(__dirname + '/login.html')); 
      });
      
    app.get('/register', function(request, response)  {
        response.sendFile(path.join(__dirname + '/register.html')); 
      });

    app.get('/home', function(request, response) {
        if (request.session.loggedin) {
        logger.info(request.session);
            response.send('Welcome back, ' + request.session.username + '!');
        } else {
            response.send('Please login to view this page!');
        }
        response.end();
    });
    
    app.get('/search', function(request, response) {
      response.sendFile(path.join(__dirname + '/search.html'));
    
    });


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