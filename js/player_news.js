$(document).ready( () => {
    playerNews = new PlayerNews;
    playerNews.ajaxCall()
});

function PlayerNews () {
    
    //AJAX call returns daily game schedule as a Javascript object
    this.ajaxCall = () => {
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=3fde3b14410a4ffd9ec5807677972117',
            dataType: 'json',
            method: 'get',
            success: this.success,
            error: this.error,
        });
    };

    //Access JSON response from AJAX call and create the DOM with jQuery
    this.success = (response) => {
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
            
            //Assigns read more button to appropriate article
            var buttonInfo = $button[0];
            buttonInfo.newsArticle = response.articles[i].url;
            buttonInfo.newsTitle = response.articles[i].title;

            //Append title, description, and button to news section
            $('.newsHeader').append($h3);
            $('.newsHeader').append($div);
            $($div).append($button);
        }
        
        //Read more button executes Modal with an iframe of the specific Article clicked on
        $('.newsButton').on('click', function(){
            $('.modal-body').empty();
            var $iframe = $('<iframe>', {
                src: this.newsArticle,
            });
            $('.modal-title').text(this.newsTitle);
            $('.modal-body').append($iframe);
            $('#newsModal').modal('show');
        });

        //Removes iframe from modal on hide
        $("#newsModal").on('hidden.bs.modal', (e) => {
            $("#newsModal iframe").attr("src", '');
        });
        this.error = (response) => {
            console.log('error', response);
        }
    }
}

var playerNews = null;