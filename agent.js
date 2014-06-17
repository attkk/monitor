//TODO: create agent config and move these variables from agent.js

var http = require('http'),
	request = require('request'),
	rsvp = require('rsvp'),
	oauth = require('oauth'),
	_ = require('underscore');

var server_host = 'localhost',
	server_port = 3030,
    fetch_interval = 3600000;

// Twitter configuration variables
var	consumer_key = 'Q2HI9jwJhYnQW9mrLUWmUpbjo',
	consumer_secret = 'EOx0E2y97Vvt4RFZl29kaphNc4eXiSqQWkuXNt1yKslTv0hReA',
	oauth_token = '22958699-BixSJr12ZVBoVQrJYuNevrni1pYAIZCSoNPiP0oz6',
	oauth_secret = 'rGtozF8vxc5FU62EwMp1o248feXLW8JWsI9wDUZ0JhrwJ';

var oauth = new oauth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	consumer_key,
	consumer_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
	);

// Server api variable
var url = 'http://' + server_host + ':' + server_port + '/api/tags/';

// Agent methods

// Get tags from server via REST API
var getTags = function(url) {
    var promise = new rsvp.Promise(function(resolve, reject) {
        request.get(url, handler);
        function handler(error, response) {
            if (error) reject(this);
            resolve(JSON.parse(response.body));
        }
    });
    return promise;
};

// Get tweets by specific tag
var getTweetsByTag = function(tag) {
	var promise = new rsvp.Promise(function(resolve, reject) {
		var twitter_url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + tag + '&count=10';
        // TODO: add custom tweets count
		oauth.get(twitter_url, oauth_token, oauth_secret, handler);
		function handler(error, data, response) {
			if (error) reject(this);
			resolve([JSON.parse(data), tag]);
		}
	});
	return promise;
};

// Save tweets to corresponding tag collection via sending REST put request
var saveTagTweets = function(data) {
	var promise = new rsvp.Promise(function(resolve, reject) {

		var options = {
			url: 'http://localhost:3030/api/tweets/' + data[1],
			method: 'PUT',
			body: JSON.stringify(data[0]),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		console.log(data[0]['statuses'][0]['text']); //TODO: remove this
		request(options, handler);
		function handler(error, response) {
			if (error) reject(error);
            console.log(response.statusCode + 'OK');
			resolve(response.statusCode);
		}
	});
	return promise;
};

// Main chain
setInterval(function() {
    console.log('Started process chain...');
    getTags(url)
    .then(function(tags) {
        _.each(tags, function(tag) {
            getTweetsByTag(tag)
            .then(saveTagTweets);
        });
    }, function(error) {
        console.log(error);
    });

}, fetch_interval);