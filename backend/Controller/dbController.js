var db = require('../Models/setupdb.js');

exports.setupdb = function(request, res) {
    var dbsetup = new db();
    db.setupDB(function(err, db)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(db);
        }
    });
};

exports.setuptags = function(request, result) {
    db.insertInfo(function(err, db)
    {
        if(err)
        {
            result.send(err);
        }
        else
        {
            result.send(db);
        }
    });
};
