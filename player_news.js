
$(document).ready(function() {

playerNews = new PlayerNews;

});

function PlayerNews () {

    console.log('this works');
        $.ajax({
        url: 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=3fde3b14410a4ffd9ec5807677972117',
        dataType: 'json',
        method: 'get',
        data: {

        },
        success: function(response) {
            for(var i = 0; i < response.articles.length; i++){
 
                var div1 = $('<div>',{
                    text: response.articles[i].title
                });
                var div2 = $('<div>',{
                    text: response.articles[i].description
                });
                $('.playerNews').append(div1);
                $('.playerNews').append(div2);
                var img = $('<img>',{
                    src: response.articles[i].urlToImage
                });
                $('.playerNews').append(img);

            }


        }
        // error: function(xhr, ajaxOptions, thrownError) {
        // }
    })
}


var playerNews = null;



