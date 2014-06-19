module.exports.requiresLogin = function(req, res, next) {
    console.log(req);
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

/*
module.exports.requiresRole = function(role) {
    return function(req, res, next) {
        if(!req.isAuthenticated() || !_.contains(req.user.roles, role)) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};
*/