
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
    },
        this.success = function (response) {
            for (var i = 0; i < response.articles.length; i++) {
                console.log('success', response.articles[i]);
                var $h3 = $('<h3>', {
                    text: response.articles[i].title,
                    class: 'title'
                });
                var $div = $('<div>', {
                    text: response.articles[i].description,
                    class: 'description'
                });
                var $a = $('<a>', {
                    text: 'Read More',
                    href: response.articles[i].url
                });
                $('.playerNews').append($h3);
                $('.playerNews').append($div);
                $('.player').append($a);
                var img = $('<img>', {
                    src: response.articles[i].urlToImage
                });
                $('.playerNews').append(img);
            }
            this.error = function (response) {
                console.log('error', response);
            }
        }
}


var playerNews = null;



