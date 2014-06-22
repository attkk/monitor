var mongoose = require('mongoose'),
    passwords = require('../common/passwords');
    _ = require('underscore');

var User = mongoose.model('User'),
    Tag = mongoose.model('Tag'),
    ObjectId = mongoose.Types.ObjectId;

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

module.exports.getTagsByUser = function(req, res) {
    User.findOne({_id: ObjectId(req.params.id)}).exec(function(err, result) {
        if (err) console.log(err);
        res.send(result['tags']);
    });
};

module.exports.addUserTag = function(req, res) {
    var tag = req.body.tag;
    User.update({_id: ObjectId(req.params.id)}, {$push: {tags: tag}}).exec(function(err, result) {
        if (err) console.log(err);

        User.findOne({_id: ObjectId(req.params.id)}).exec(function(err, result) {
            if (err) console.log(err);
            res.send(result['tags']);
        });
        //this.getTagsByUser(req, res);
        //res.send(result);
    });

    Tag.create({tag: tag, tweets: undefined});
};

module.exports.createUser = function(req, res, next) {
    var newUserObj = req.body;
    newUserObj.salt = passwords.createSalt();
    newUserObj.password = passwords.createPasswordHash(newUserObj.salt, newUserObj.password);
    newUserObj.roles = ['user'];
    newUserObj.tags = [];

    User.create(newUserObj, function(err, user) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()})
        }
        req.logIn(user, function(err) {
            if (err) {return next(err)}
            res.send(user);
        });
    });
};