var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        tags: [Schema.Types.Mixed]
    });

    userSchema.methods = {
        validPassword: function(password) {
        return createPasswordHash(this.salt, password) === this.password;
         }
    };

    function createSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function createPasswordHash(salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }

    // Tags

    var tagSchema = new Schema({
        tag: String,
        tweets: Object
    });

    // Create initial data

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt = createSalt();
            var hash = createPasswordHash(salt, 'test');
            User.create({username:'test', salt: salt, password: hash, role: ['admin'], tags: ['bing', 'facebook']});
        }
    });

    var Tag = mongoose.model('Tag', tagSchema);
    Tag.find().exec(function(err, collection) {
        if (collection.length === 0) {
            Tag.create({tag: 'bing', tweets: undefined});
            Tag.create({tag: 'facebook', tweets: undefined});
        }
    });
};