var Tag = require('mongoose').model('Tag'),
    _ = require('underscore');

module.exports.updateTagTweets = function(req, res) {
    var tag = req.params.tag,
        tweets = _.uniq(req.body.tweets),
        lastId = req.body.lastId;

    Tag.update({tag: tag}, {lastId: lastId, $pushAll: {tweets: tweets}}).exec(function(err, result) {
        if (err) console.log(err);
        res.send(result);
    });
};

module.exports.getTagByTagName = function(req, res) {
    Tag.findOne({tag: req.params.tag}).exec(function(err, tag) {
        if (err) console.log(err);
        res.json(tag);
    });
};

