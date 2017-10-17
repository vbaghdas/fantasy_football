$(document).ready(function() {
    playerNews = new PlayerNews;
    playerNews.ajaxCall()
});

function PlayerNews () {
    //AJAX call returns daily game schedule as a Javascript object
    this.ajaxCall = function () {
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=3fde3b14410a4ffd9ec5807677972117',
            dataType: 'json',
            method: 'get',
            success: this.success,
            error: this.error,
        });
    };
    //Access JSON response from AJAX call and create the DOM with jQuery
    this.success = function (response) {
        for (var i = 0; i < response.articles.length; i++) {
            var img = $('<img>', {
                src: response.articles[i].urlToImage,
                class: 'avatarNews'
            });
            $('.newsHeader').append(img);
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
                class: 'btn btn-warning btn-xs newsButton',
                text: 'Read More'
            });
            var buttonInfo = $button[0];
            buttonInfo.newsArticle = response.articles[i].url;
            $('.newsHeader').append($h3);
            $('.newsHeader').append($div);
            $($div).append($button);
        }
        //Read more button executes Modal with an iframe of the specific Article clicked on
        $('.newsButton').on('click', function(){
            $('.modalNews').empty();
            var $iframe = $('<iframe>', {
                src: this.newsArticle,
                width: '60vw',
                height: '60vh'
            });
            $('.modalNews').append($iframe);
        });
        $('.btn-warning').attr('data-toggle', 'modal');
        $('.btn-warning').attr('data-target', '#readMore');
        //Removes iframe from modal on hide
        $("#readMore").on('hidden.bs.modal', function (e) {
            $("#readMore iframe").attr("src", '');
        });
        this.error = function (response) {
            console.log('error', response);
        }
    }
}

var playerNews = null;