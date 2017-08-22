$(document).ready(function(){
    player_list = new Player_list;
});

function Player_list() {
    var football_nerd_api = '5fau8mwe74me';
    // $.ajax({
    //     method: 'GET',
    //     url: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/roster_players.json?fordate=20171029',
    //     dataType: 'json',
    //     async: false,
    //     headers: {
    //         "Authorization": "Basic " + btoa("vbaghdas" + ":" + "consoles1")
    //     },
    //     success: function(response) {
    //         console.log(response)
    //     }
    // })
    this.init = function(){
        this.create_player_list();
    }
    this.create_player_list = function() {

        var $player_div = $('<div>', {
            class: 'dropdown'
        });
        var $player_list = $('<ul>',{
            class: 'dropdown-menu'
        });
        var $player_button = $('<button>', {
            class: 'btn btn-primary dropdown-toggle',
            type: 'button',
            'data-toggle': 'dropdown',
            text: 'Players'
        });
        for (var i = 0; i < 10; i++) {
            var $player_item = $('<li>',{
                text: i,
            });
            debugger
            this.selected_player($player_item[0]);
            $($player_list).append($player_item);
        };
        $($player_div).append($player_list);
        $($player_div).append($player_button);
        $('body').append($player_div)
    }

    this.selected_player = function(element) {
        $(element).click(function(){
            console.log($(element))
        })
    }
    this.init();

}

var player_list = null;

















// $.ajax({
//     method: 'GET',
//     url: 'http://localhost:8888/server/football.php?service-name=nfl-teams&format=json&api-key=35fdy7tax7wb',
//     dataType: 'json',
//     success: function(response) {
//         console.log(response)
//     }
// })