var path = require('path');
var projectRoot = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        projectRoot: projectRoot,
        db: 'mongodb://localhost/monitor',
        port: process.env.PORT || 3030
    },
    production:{
        projectRoot: projectRoot,
        db: '', // Set in case it is needed
        port: process.env.PORT || 80
    }
};