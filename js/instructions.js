$(document).ready(instructionsModal);

function instructionsModal() {
    //Show modal on page load
    $('#newsModal').modal("show"); 
    $('.modal-title').text('Fantasy Football Instructions');

    var video = $('<video>', {
        autoplay: 'autoplay',
        width: '100%'
    });
    var source = $('<source>', {
        src: './assets/images/info.mp4',
        type: 'video/mp4'
    });

    //Append video source to the modal body
    $(video).append(source);
    $('.modal-body').append(video);
}

