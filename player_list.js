$(document).ready(function(){
    player_list = new Player_list;
});

function Player_list() {
    var football_nerd_api = '5fau8mwe74me';
    this.team_array = Object.keys(playertwitter.teamArray)
    this.players = [];
    this.active_team = '';
    $.ajax({
        method: 'GET',
        url: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/roster_players.json?fordate=20171029',
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + btoa("vbaghdas" + ":" + "consoles1")
        },
        success: (response) => {
            for(var i = 0; i < response.rosterplayers.playerentry.length; i++) {
                this.players.push({
                    first_name: response.rosterplayers.playerentry[i].player.FirstName,
                    last_name: response.rosterplayers.playerentry[i].player.LastName,
                    team: (response.rosterplayers.playerentry[i].team) ? response.rosterplayers.playerentry[i].team.Name : 'no team',
                });
                this.players[i].hash_list = '#' + this.players[i].team + ' ' + '#' +this.players[i].first_name + this.players[i].last_name + ' ' + '#' + 'nfl'
            }
        }
    });
    this.init = function(){
        this.create_team_list();
    };

    this.create_player_list = () => {
        var filter_player = this.players.filter((player) => {return player.team === this.active_team});
        var $player_list = $('<ul>',{
            class: 'dropdown-menu'
        });
        for (var i = 0; i < filter_player.length; i++) {
            var $player_item = $('<li>',{
                text: filter_player[i].first_name + ' ' + filter_player[i].last_name + ' , ' + filter_player[i].team
            });
            var team = filter_player[i].team;
            this.selected_player($player_item[0], i, team);
            $($player_list).append($player_item);
        }
        $('#player-dropdown').append($player_list);
    };

    this.create_team_list = function() {
        var $team_list = $('<ul>', {
            class: 'dropdown-menu'
        });
        for (var i = 0; i < this.team_array.length; i++) {
            var $team_item = $('<li>', {
                text: this.team_array[i],
            });
            this.selected_team($team_item[0], i);
            $($team_list).append($team_item);
        }
        $('#team-dropdown').append($team_list);
    };

    this.selected_player = function(element, i, team) {
        element.player_info = $(element);
        $(element).click(function(){
            $('.playerList').append(element);
            playertwitter.twitterFeed(team)
        });
    };

    this.selected_team = (function(player_list) { return function(element, i) {
        element.team_info = this.team_array[i];
        $(element).on('click', function(){
            $('#team-dropdown li').removeClass('active');
            $(this).addClass('active');
            $('#player-dropdown').find('ul').slice(0).remove();
            player_list.active_team = this.team_info;
            player_list.create_player_list();
        })
    }})(this);
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