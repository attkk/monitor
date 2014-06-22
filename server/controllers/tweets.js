var Tag = require('mongoose').model('Tag'),
    User = require('mongoose').model('User'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

module.exports.getUserTweets = function(req, res) {
    User.findOne({_id: ObjectId(req.params.id)}).exec(function(err, result) {
        if (err) console.log(err);
        Tag.find({tag: {$in: result['tags']}}).exec(function(err, result) {
            if (err) console.log(err);
            console.log(result);
            res.json(result)
        });
    });
};
