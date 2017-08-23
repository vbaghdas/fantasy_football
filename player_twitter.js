$(document).ready(function(){
playertwitter = new PlayerTwitter;
// playertwitter.twitterPlayer();
})

function PlayerTwitter(){
console.log('PlayerTwitter function');


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

this.teamArray = {
	Cardinals: 'AZCardinals',
	Giants: 'Giants',
	Colts: 'Colts',
	Eagles: 'Eagles',
	Jaguars: 'Jaguars',
	Panthers: 'Panthers',
	Bears: 'ChicagoBears',
	Lions: 'Lions',
	'49ers': '49ers',
	Browns: 'Browns',
	Redskins: 'Redskins',
	Buccaneers: 'TBBuccaneers',
	Packers: 'packers',
	Chiefs: 'Chiefs',
	Saints: 'Saints',
	Patriots: 'Patriots',
	Vikings: 'Vikings',
	Bills: 'buffalobills',
	Bengals: 'Bengals',
	Rams: 'RamsNFL',
	Seahawks: 'Seahawks',
	Ravens: 'Ravens',
	Dolphins: 'MiamiDolphins',
	Steelers: 'steelers',
	Titans: 'Titans',
	Broncos: 'Broncos',
	Texans: 'HoustonTexans',
	Jets: 'nyjets',
	Falcons: 'AtlantaFalcons',
	Raiders: 'RAIDERS',
	Cowboys: 'dallascowboys',
	Chargers: 'Chargers'
	}

this.twitterFeed = function (team){
	var twitterHandle = null;
	for(var i in this.teamArray){
		if(team === i){
			this.twitterHandle = this.teamArray[i]
		}
	}
	console.log('ajaxCall function');
	$.ajax({
	dataType: 'json',
	method: 'post',
	url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
	data: {
		// search_term: hashtag
		// user_id:
		action: 'user',
		screen_name: team
		// include_entities: false
	},
	success: this.callSuccess,
	error: this.callError
})
};


this.callSuccess = function(response){
	// console.log('Success: ',response);
	console.log(response);
	var playerList = null

	var $name = $('<span>',{
		text: response.info.name,
		class: 'tweetName'
	});
	var $tweet = $('<div>',{
		class: 'twitterPost'
	});
    var $i = $('<i>',{
        class: 'fa fa-twitter'
    });
	$('.playerTweets').append($i).append($name).append($tweet);
	$tweet.append(response.info.status.text);
	$('.playerTweets').append($tweet);


};

this.callError = function(response){
	console.log('Error: ',response)
}


}
var playertwitter = null;