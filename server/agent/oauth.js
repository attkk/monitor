var oauth = require('oauth'),
    credentials = require('./credentials');

module.exports.oauth = new oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    credentials.consumer_key,
    credentials.consumer_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
);