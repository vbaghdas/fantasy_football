$(document).ready(function(){
playertwitter = new PlayerTwitter;
playertwitter.twitterPlayer();
})

function PlayerTwitter(){
console.log('PlayerTwitter function');


this.twitterNames = [
	'jtuck9',
	'DougBaldwinJr',
	'TG3II',
	'tkelce',
	'Chiefs',
	'bilalpowell29',
	'Edelman11',
	'Teco_Raww',
	'sammywatkins',
	'Titans',
	'Fatrob32',
	'KennyBritt_18',
	'Prosisely_22',
	'WizardOfBoz09',
	'Giants'
	];
//this.twitterPlayer();
this.twitterPlayer = function(){
	for(var i = 0; i < this.twitterNames.length; i++){
		var playerAtIndex = this.twitterNames[i]
		this.twitterFeed(playerAtIndex);
	}
}

this.twitterRetweet = function (){
	// var tweetRecount = response.info.statuses[i].retweet_count;
	this.tweetRecount = null;
	this.tweet = null;
	for(var i = 0; i < response.tweets.statuses.length; i++){
		if(this.tweetRecount < response.info.statuses[i].retweet_count){
			this.tweet = response.info.statuses[i].text;
			this.tweetRecount = response.info.statuses[i].retweet_count;
		}
	}
	return this.tweet;
}

this.twitterFeed = function (player){
	console.log('ajaxCall function');
	$.ajax({
	dataType: 'json',
	method: 'post',
	url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
	data: {
		search_term: '#ODELL'
		// user_id:
		// action: 'user',
		// screen_name: '#NFL #Giants #ODELL'
		// include_entities: false
	},
	success: this.callSuccess,
	error: this.callError
})
}


this.callSuccess = function(response){
	// console.log('Success: ',response);
	console.log(response);
	// var $name = $('<span>',{
	// 	text: response.info.name,
	// 	class: 'tweetName'
	// })
	var $tweet = $('<div>',{
		class: 'twitterPost'
	})
	$('.playerTweets').append($tweet);



	// $tweet.append($name).append(response.info.status.text);

	$('.playerTweets').append($tweet);

}
this.callError = function(response){
	console.log('Error: ',response)
}


}
var playertwitter = null;