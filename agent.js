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

var server_url = 'http://localhost:3030';

var getAllUniqueTags = function(url) {
    var promise = new rsvp.Promise(function(resolve, reject) {
        request.get(url, handler);
        function handler(error, response) {
            if (error) reject(this);
            var tagList = JSON.parse(response.body);
            //var tagList = ['test5tag'];
            resolve(tagList);
        }
    });
    return promise;
};

var getTweetsByTag = function(tag) {
	var promise = new rsvp.Promise(function(resolve, reject) {
        var tagObj = JSON.parse(tag),
            count = 20,
            baseUrl = 'https://api.twitter.com/',
            twitterUrl = baseUrl + '1.1/search/tweets.json?q=%23' + tagObj.tag + '&count=' + count;

        if (!!tagObj.lastId) {
            twitterUrl = twitterUrl + '&since_id=' + tagObj.lastId;
        }
        console.log(twitterUrl);
		oauth.get(twitterUrl, oauth_token, oauth_secret, function(error, data, response) {
            if (error) reject(this);



            var data = {tagObj: tagObj, tweetsQueryObj: JSON.parse(data)};
            resolve(data);
        });
	});
	return promise;
};

var getTagObjByTagName = function(tag) {
    var promise = new rsvp.Promise(function(resolve, reject) {

        var url = server_url + '/api/tweets/' + tag;

        request.get(url, function(error, response) {
            if (error) reject(this);
            var tag = response.body;
            resolve(tag);
        });
    });
    return promise;
};

var saveTagTweets = function(data) {
	var promise = new rsvp.Promise(function(resolve, reject) {
        var resultObj = data,
            tag = resultObj.tagObj.tag,
            tweetList = resultObj.tweetsQueryObj['statuses'],
            lastTweetId = resultObj.tweetsQueryObj['search_metadata']['max_id'];

        /*
        console.log(tag);
        console.log(tweetList);
        console.log(lastTweetId);



        // Remove element from previous search
        if (!!tag.lastId) {
            if (tweetList[tweetList.length - 1].id === tag.lastId){
                tweetList.pop();
            }
        }

        console.log(tweetList);
*/
		var options = {
			url: 'http://localhost:3030/api/tweets/' + tag,
			method: 'PUT',
			body: JSON.stringify({tweets: tweetList, lastId: lastTweetId}),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		request(options, handler);
		function handler(error, response) {
			if (error) reject(error);
            console.log(response.statusCode);
			resolve();
		}
	});
	return promise;
};

//setInterval(function() {
console.log('Started process chain...');
getAllUniqueTags(url)
.then(function(tags) {
    _.each(tags, function(tag) {
        getTagObjByTagName(tag)
        .then(getTweetsByTag)
        .then(saveTagTweets);
    });
}, function(error) {
    console.log(error);
});

//}, fetch_interval);