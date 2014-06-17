var passport = require('passport'),
    users = require('../controllers/users'),
    tags = require('../controllers/tags');


module.exports = function(app) {

    app.get('/api/tags', users.getAllTags);

    app.get('/partials/*', function(req, res) {
        var path = req.params[0];
        res.render('../../public/app/' + path);
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.send({success: false}); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                res.send({success: true, user: user});
            });
        })(req, res, next);
    });

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    // REST API routes for agent communication
    app.get('/api/tags/', users.getAllTags);
    app.put('/api/tweets/:tag', tags.updateTagTweets);

    app.all('/api/*', function(req, res) {
        res.send(404);
    });

    app.get('*', function(req, res) {
        res.render('index', {
            userObject: req.user // TODO: check if it is valid approach
        })
    });
};