$(document).ready(function(){
playertwitter = new PlayerTwitter;
playertwitter.twitterPlayer();
})

function PlayerTwitter(){
console.log('PlayerTwitter function');

this.playerList = [
	'Justin Tucker', 
	'Doug Baldwin', 
	'Todd Gurley',
	'Travis Kelce',
	'Tyreek Hill',
	'Bilal Powell',
	'Julian Edelman',
	'Tevin Coleman',
	'Sammy Watkins',
	'Marcus Mariota',
	'Rob Kelley',
	'Kenny Britt',
	'CJ Prosise',
	'Chris Boswell',
	'Eli Manning'
	];

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

this.twitterFeed = function (player){
	console.log('ajaxCall function');
	$.ajax({
	dataType: 'json',
	method: 'post',
	url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
	data: {
		// search_term: 'Odell Beckham JR.'
		// user_id:
		action: 'user',
		screen_name: player
		// include_entities: false
	},
	success: this.callSuccess,
	error: this.callError
})
}


this.callSuccess = function(response){
	console.log('Success: ',response.info.status.text);
	var $tweet = $('<div>',{
		text: response.info.status.text,
		class: 'twitter'
	})
	$('.playerTweets').append($tweet);
	var $br = $('<br><br>');
	$($tweet).append($br);
}
this.callError = function(response){
	console.log('Error: ',response)
}


}
var playertwitter = null;