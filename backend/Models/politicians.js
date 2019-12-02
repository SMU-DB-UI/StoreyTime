'use strict';

var connection = require('./db.js');

var Politician = function(politician)
{
    this.user_id = politician.user_id;
    this.politician_type = politician.politician_type;
    this.office_phone = politician.office_phone;
    this.office_email = politician.office_email;
    this.inactive = politician.inactive;
};

Politician.createPolitician = function(newPolitician, result)
{
    connection.query("INSERT INTO `ballotBuddy`.`politicians` (user_id, politician_type, office_phone, office_email, inactive) VALUES ('"+ newPolitician.user_id +"', '"+ newPolitician.politician_type +"', '"+ newPolitician.office_phone +"', '"+ newPolitician.office_email +"', '"+ 0 +"');",
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200, "user_id": newPolitician.user_id, "politician_type": newPolitician.politician_type});
        }
    });
};

Politician.updateOfficeEmail = function(id, office_email, result) {
    connection.query("UPDATE `ballotBuddy`.`politicians` SET office_email = ? WHERE user_id = ?", [office_email, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};

Politician.updateOfficePhone = function(id, office_phone, result) {
    connection.query("UPDATE `ballotBuddy`.`politicians` SET office_phone = ? WHERE user_id = ?", [office_phone, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};

Politician.updatePoliticianType = function(id, politician_type, result) {
    connection.query("UPDATE `ballotBuddy`.`politicians` SET politician_type = ? WHERE user_id = ?", [politician_type, id], 
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};

Politician.setAsInactive = function(id, result) {
    connection.query("UPDATE `ballotBuddy`.`politicians` SET inactive=1 WHERE user_id = ?", [id],
    function(err, res)
    {
        if(err)
        {
            result(err, null);
        }
        else
        {
            result(null, {"code":200});
        }
    });
};

module.exports = Politician;
