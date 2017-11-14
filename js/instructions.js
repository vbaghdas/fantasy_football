$(document).ready(instructionsModal);

function instructionsModal() {
    $('#newsModal').modal("show"); 
    $('.modal-title').text('Welcome to Fantasy Football');

    var $iframe = $('<iframe>', {
        src: this.newsArticle,
    });
    $('.modal-body').append($iframe);

    $(".modal-body iframe").attr("src", 'http://vachebaghdassarian.com/fantasy_football/images/info.mp4');
}