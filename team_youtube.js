$(document).ready(function(){
teamYoutube = new TeamYoutube;
})

function TeamYoutube(){
	console.log('TeamYoutube function called');
	var teamName = ''
	this.getName = function(name){
		teamName = name;
	}
	this.youtubeAPI = function (){
		console.log('youtubeAPI');
		$.ajax({
			dataType: 'json',
			method: 'post',
			url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',//'https://www.googleapis.com/youtube/v3/search?type=video&q=&maxResults=10&part=snippet&key=AIzaSyBvNlZYa22zEunv7FN4EVEZHX0YkVOXClQ',
			data: {
				q: 'nfl '+teamName,//search term to search youtube for
				maxResults: 10// (number) number of results to return in one search
				//type: 'video'//(string) video or channel. default is video
			},
			success: this.apiSuccess,
			error: this.apiError
		});
	};

	this.apiSuccess = function (response){
		console.log('success: ', response.video[0]);
		this.videoID = response.video[0].id;
		this.videoTitle = response.video[0].title;
		// this.
	}
	this.apiError = function (response){
		console.log('Error: ', response);
	}
	
}


var teamYoutube = null;