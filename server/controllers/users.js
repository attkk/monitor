var User = require('mongoose').model('User'),
    _ = require('underscore');

module.exports.getAllTags = function(req, res) {
    User.find().select('tags').exec(function(err, result) {
        if (err) console.log(err);
        var allTags = [];
        for (var i = 0; i < result.length; i++) {
            allTags = allTags.concat(result[i]['tags']);
        }
        res.send(_.uniq(allTags));
    });
};