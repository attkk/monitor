var mongoose = require('mongoose'),
    passwords = require('../common/passwords');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error...'));
    db.once('open', function callback () {
        console.log('Connected to MongoDB...');
    });

    var Schema = mongoose.Schema;

    // Users

    var userSchema = Schema({
        username: String,
        salt: String,
        password: String,
        roles: [String],
        tags: [Schema.Types.Mixed] //TODO: change to array?
    });

    userSchema.methods = {
        validPassword: function(password) {
        return passwords.createPasswordHash(this.salt, password) === this.password;
         }
    };

    // Tags

    var tagSchema = new Schema({
        tag: String,
        tweets: [Schema.Types.Mixed],
        lastId: String
    });

    // Create initial data

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt = passwords.createSalt();
            var hash = passwords.createPasswordHash(salt, 'test');
            //User.create({username:'test', salt: salt, password: hash, roles: ['admin', 'user'], tags: ['bing', 'facebook']});
            User.create({username:'test', salt: salt, password: hash, roles: ['admin', 'user'], tags: []});
            var salt = passwords.createSalt();
            var hash = passwords.createPasswordHash(salt, 'lol');
            User.create({username:'lol', salt: salt, password: hash, roles: [], tags: ['apple']});
        }
    });

    var Tag = mongoose.model('Tag', tagSchema);
    Tag.find().exec(function(err, collection) {
        if (collection.length === 0) {
//            Tag.create({tag: 'bing', tweets: undefined});
//            Tag.create({tag: 'facebook', tweets: undefined});
//            Tag.create({tag: 'apple', tweets: undefined});
//            Tag.create({tag: 'test5tag', tweets: undefined});
        }
    });

    function toObjectId(id) {
        return mongoose.Types.ObjectId.fromString(id);
    }
};