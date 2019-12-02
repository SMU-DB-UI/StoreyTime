var Politician = require('../Models/politicians.js');

exports.createPolitician = function(request, result)
{
    var newPolitician = new Politician(request.body);
    Politician.createPolitician(newPolitician, function(err, politician)
    {
        if(err)
        {
            result.send(err);
        }
        else
        {
            result.json(politician);
        }
    });
};

exports.updatePhone = function(request, result)
{
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing id in params"});
    }
    else if(! request.body.office_phone)
    {
        result.status(400).json({"code":400, "response":"Missing office phone in body"});
    }
    else
    {
        Politician.updateOfficePhone(request.params.id, request.body.office_phone, function(err, politician)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(politician);
            }
        });
    }
};

exports.updateEmail = function(request, result)
{
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing id in params"});
    }
    else if(! request.body.office_email)
    {
        result.status(400).json({"code":400, "response":"Missing office email in body"});
    }
    else
    {
        Politician.updateOfficeEmail(request.params.id, request.body.office_email, function(err, politician)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(politician);
            }
        });
    }
};

exports.updatePoliticianType = function(request, result)
{
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing id in params"});
    }
    else if(! request.body.politician_type)
    {
        result.status(400).json({"code":400, "response":"Missing politician_type in body"});
    }
    else
    {
        Politician.updatePoliticianType(request.params.id, request.body.politician_type, function(err, politician)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(politician);
            }
        });
    }
};

exports.setInactive = function(request, result)
{
    if(! request.params.id)
    {
        result.status(400).json({"code":400, "response":"Missing id in params"});
    }
    else
    {
        Politician.setAsInactive(request.params.id, function(err, politician)
        {
            if(err)
            {
                result.send(err);
            }
            else
            {
                result.json(politician);
            }
        });
    }
};

