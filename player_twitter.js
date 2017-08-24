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
	this.teamName = '';
	this.twitterHandle = null;
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
	};

this.twitterFeed = function (team){
	var twitterHandle = null;
	this.teamName = team;
	teamYoutube.getName(team);
	teamYoutube.youtubeAPI();
	for(var i in this.teamArray){
		if(team === i){
			this.twitterHandle = this.teamArray[i]
		}
	}
};

this.twitterCall = function() {
	console.log('ajaxCall function');
	$.ajax({
		dataType: 'json',
		method: 'post',
		url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
		data: {
			// search_term: hashtag
			// user_id:
			action: 'user',
			screen_name: this.twitterHandle
			// include_entities: false
		},
		success: this.callSuccess,
		error: this.callError
	})
}

this.twitterURL = null;
this.callSuccess = function(response){
	// console.log('Success: ',response);
	console.log(response);
	this.twitterURL = 'https://twitter.com/' + response.info.screen_name;
	var playerList = null

	var $titleDiv = $('<div>', {
		class: 'titleContainer'
	});
	var $name = $('<div>',{
		text: response.info.name,
		class: 'tweetName',
		css: {
			'font-size': '1em'
		}
	});
	var $tweet = $('<div>',{
		class: 'twitterPost'
	});
    var $twitterLogo = $('<i>',{
        class: 'fa fa-twitter',
        css: {
        	'font-size': '1.6em',
        	'color': 'white'
        }
    });
    var $youtubeLogo = $('<i>',{
    	class: 'fa fa-youtube fa-lg',
    	css: {
    		'float': 'right',
    		'color': 'red',
    		'font-size': '1.6em'
    	}
    });
    var $aTag = $('<a>',{
			href: teamYoutube.youtubeURL,
			target: '_blank'
		});
    var $twitterAtag = $('<a>',{
    		href: this.twitterURL,
    		target: '_blank'
    });
    var i = 0;
    (function() {
        while($(`.titleContainer:eq(${i})`)['0'] !== undefined ) {
            if($(`.titleContainer:eq(${i}) .tweetName`).text() === response.info.name) {
            	return
			} i++
		}
        $titleDiv.append($twitterAtag, $name, $aTag);
        $('.playerTweets').append($titleDiv, $tweet);
        $tweet.append(response.info.status.text);
        // $('.playerTweets').append($tweet);
        $aTag.append($youtubeLogo);
        $twitterAtag.append($twitterLogo);

    })();
};
this.callError = function(response){
	console.log('Error: ',response)
}


}
var playertwitter = null;