
$(document).ready(function() {

playerNews = new PlayerNews;
playerNews.ajaxCall()

});

function PlayerNews () {
    this.ajaxCall = function () {
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=3fde3b14410a4ffd9ec5807677972117',
            dataType: 'json',
            method: 'get',
            success: this.success,
            error: this.error
        });
    };
    this.success = function (response) {
        for (var i = 0; i < response.articles.length; i++) {
            var img = $('<img>', {
                src: response.articles[i].urlToImage,
                class: 'img-rounded'
            });
            $('.playerNews').append(img);
            var $h3 = $('<h3>', {
                text: response.articles[i].title,
                class: 'title'
            });
            var $div = $('<div>', {
                text: response.articles[i].description,
                class: 'description'
            });
            var $button = $('<button>',{
                type: 'button',
                class: 'btn btn-info btn-xs newsButton',
                text: 'Read More'
            });
            var buttonInfo = $button[0];
            buttonInfo.newsArticle = response.articles[i].url;
            $('.playerNews').append($h3);
            $('.playerNews').append($div);
            $($div).append($button);
        }
        $('.newsButton').on('click', function(){
            $('.modalNews').empty();
            var $iframe = $('<iframe>', {
                src: this.newsArticle,
                width: '60vw',
                height: '60vh'
            });
            $('.modalNews').append($iframe);
        });
        $('.btn-info').attr('data-toggle', 'modal');
        $('.btn-info').attr('data-target', '#readMore');
        this.error = function (response) {
            console.log('error', response);
        }
    }
}


var playerNews = null;



