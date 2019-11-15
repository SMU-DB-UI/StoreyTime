'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'backend-db',
    port: '3306',
    user: 'user',
    password: 'password',
    database: 'ballotBuddy'
  });

connection.connect( function(err) {
    if(err)
    {
        throw err;
    }
    else
    {
      logger.info("connected to DB");
    }
  
  });

module.exports = connection;