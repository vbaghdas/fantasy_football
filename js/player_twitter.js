$(document).ready( () => {
	playertwitter = new PlayerTwitter;
})

function PlayerTwitter(){

	this.twitterRetweet = () => {
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
		// Cardinals: 'AZCardinals',
		// Giants: 'Giants',
		// Colts: 'Colts',
		Eagles: 'Eagles',
		Jaguars: 'Jaguars',
		Panthers: 'Panthers',
		Bears: 'ChicagoBears',
		// Lions: 'Lions',
		// '49ers': '49ers',
		// Browns: 'Browns',
		// Redskins: 'Redskins',
		// Buccaneers: 'TBBuccaneers',
		// Packers: 'packers',
		Chiefs: 'Chiefs',
		Saints: 'Saints',
		Patriots: 'Patriots',
		Vikings: 'Vikings',
		Bills: 'buffalobills',
		// Bengals: 'Bengals',
		Rams: 'RamsNFL',
		// Seahawks: 'Seahawks',
		// Ravens: 'Ravens',
		// Dolphins: 'MiamiDolphins',
		Steelers: 'steelers',
		Titans: 'Titans',
		// Broncos: 'Broncos',
		// Texans: 'HoustonTexans',
		// Jets: 'nyjets',
		Falcons: 'AtlantaFalcons',
		// Raiders: 'RAIDERS',
		// Cowboys: 'dallascowboys',
		// Chargers: 'Chargers'
		};

	//Function handles Twitter feed and YouTube link
	this.twitterFeed = (team) => {
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
	
	//Returns Javascript object of Twitter feed via and AJAX call
	this.twitterCall = () => {
		$.ajax({
			dataType: 'json',
			method: 'post',
			url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
			data: {
				action: 'user',
				screen_name: this.twitterHandle
			},
			success: this.success,
			error: this.error,
		})
	}
	
	//Access JSON response on success from AJAX call and create the DOM with jQuery
	this.twitterURL = null;
	this.success = (response) => {
		this.twitterURL = 'https://twitter.com/' + response.info.screen_name;
		var playerList = null

		var $titleDiv = $('<div>', {
			class: 'titleContainer'
		});
		var $name = $('<div>',{
			text: response.info.name,
			class: 'tweetName'
		});
		var $tweet = $('<div>',{
			class: 'twitterPost'
		});
		var $teamLogo = $('<img>',{
			src: response.info.profile_image_url,
			class: 'img-rounded'
		});
		var $twitterLogo = $('<i>',{
			class: 'fa fa-twitter',
		});
		var $youtubeLogo = $('<i>',{
			class: 'fa fa-youtube'
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
		( () => {
			while($(`.titleContainer:eq(${i})`)['0'] !== undefined ) {
				if($(`.titleContainer:eq(${i}) .tweetName`).text() === response.info.name) {
					return
				} i++
			}
			$titleDiv.append($twitterAtag, $name);
			$('.playerTweets').append($titleDiv, $tweet);
			$tweet.append($teamLogo, response.info.status.text, $aTag);
			$aTag.append($youtubeLogo);
			$twitterAtag.append($twitterLogo);
		})();
	};
	this.error = (response) => {
		console.log('Error: ',response)
	}
}

var playertwitter = null;