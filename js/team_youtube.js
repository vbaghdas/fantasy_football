$(document).ready( () => {
	teamYoutube = new TeamYoutube;
})

function TeamYoutube(){

	var teamName = ''
	this.getName = function(name){
		teamName = name;
	}

	//AJAX call loads Javascript object from YouTube via data query search
	this.youtubeURL = null;
	this.youtubeAPI = () => {
		$.ajax({
			dataType: 'json',
			method: 'post',
			url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',//'https://www.googleapis.com/youtube/v3/search?type=video&q=&maxResults=10&part=snippet&key=AIzaSyBvNlZYa22zEunv7FN4EVEZHX0YkVOXClQ',
			data: {
				q: 'nfl '+teamName,//search term to search youtube for
				maxResults: 10// (number) number of results to return in one search
				//type: 'video'//(string) video or channel. default is video
			},
			success: this.apiSuccess.bind(this),
			error: this.apiError,
		});
	};
	
	//Access JSON response from AJAX call and create a button on each twitter feed
	this.apiSuccess = (response) => {
		this.videoID = response.video[0].id;
		this.videoTitle = response.video[0].title;
		this.youtubeURL = 'https://www.youtube.com/watch?v='+this.videoID;
		playertwitter.twitterCall();
	}

	this.apiError = (response) => {
		console.log('Error: ', response);
	}	
}

var teamYoutube = null;