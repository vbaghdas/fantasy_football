$(document).ready(function(){
    player_list = new Player_list;
});

function Player_list() {
    var football_nerd_api = '5fau8mwe74me';
    this.players = [];
    $.ajax({
        method: 'GET',
        url: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/roster_players.json?fordate=20171029',
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + btoa("vbaghdas" + ":" + "consoles1")
        },
        success: (response) => {
            for(var i = 0; i < 29; i++) {
                this.players.push({
                    first_name: response.rosterplayers.playerentry[i].player.FirstName,
                    last_name: response.rosterplayers.playerentry[i].player.LastName,
                    team: (response.rosterplayers.playerentry[i].team) ? response.rosterplayers.playerentry[i].team.Name : 'no team'

                });
            }
            console.log(this.players)
        }
    });
    this.init = function(){
        this.create_player_list();
    }

    this.create_player_list = function() {
        var $player_list = $('<ul>',{
            class: 'dropdown-menu'
        });
        for (var i = 0; i < 10; i++) {
            var $player_item = $('<li>',{
                text: i + 'hello',
            });
            this.selected_player($player_item[0], i);
            $($player_list).append($player_item);
        }
        $('.dropdown').append($player_list);
    };

    this.selected_player = function(element, i) {
        element.player_info = $(element).text();
        $(element).click(function(){
            $('.container .row').append(element);
            console.log($(element).text())
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