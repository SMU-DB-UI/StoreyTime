var db = require('../Models/setupdb.js');

exports.setupdb = function(request, res) {
    var dbsetup = new db();
    db.setupDB(dbsetup, function(err, db)
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
