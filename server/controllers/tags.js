var Tag = require('mongoose').model('Tag');

module.exports.updateTagTweets = function(req, res) {
    Tag.findOne({tag: req.params.tag}).exec(function(err, result) {
        if (err) console.log(err);
        result.tweets = req.body;
        result.save(function(err) {
            if (err) res.send(err);
            res.json({message: 'Tweets are up to date.'});
        });
    });
};
