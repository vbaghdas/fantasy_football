$(document).ready(function(){
    player_list = new Player_list;
});

function Player_list() {
    this.team_array = Object.keys(playertwitter.teamArray)
    this.players = [];
    this.active_team = '';
    this.filter_player = [];
    this.display_list = [];
    //AJAX call returns NFL Player Roster as a Javascript object
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
        },
        complete: function(){
            $('#preloader').fadeOut('slow',function(){$(this).remove();});
        }
    });
    //Initializes and calls the create team list function on page load
    this.init = function(){
        this.create_team_list();
    };
    //Creates the player list on the DOM as a dropdown menu
    this.create_player_list = () => {
        this.filter_player = this.players.filter((player) => {return player.team === this.active_team});

        var $player_list = $('<ul>',{
            class: 'dropdown-menu'
        });
        for (var i = 0; i < this.filter_player.length; i++) {
            var $player_item = $('<li>',{
                text: this.filter_player[i].first_name + ' ' + this.filter_player[i].last_name + ' , ' + this.filter_player[i].team,
                id: i
            });
            this.selected_player($player_item[0], this.filter_player[i]);
            if(this.check_player_list(i) === false) {
                $($player_list).append($player_item);
            }
        }
        $('#player-dropdown').append($player_list);
    };
    //Creates the team list on the DOM as a dropdown menu
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
    //
    this.selected_player = (function(player_list){return function(element, player_obj) {
        element.player_info = player_obj;
        $(element).click(function(){
            var $added_player = $('<div>',{
                class: 'added_player',
                text: this.textContent,
            });
            player_list.remove_players(this.id);

            $added_player[0].player_info = player_obj;
            $('.playerList').append($added_player);
            playertwitter.twitterFeed(player_obj.team);
            var num = 0;
        });
    }})(this);
    //
    this.check_player_list = (player_i) => {
        for(var i = 0; i < this.filter_player.length; i++) {
            if(!$(`.added_player:eq(${i})`)['0']) {
                return false
            }
            if(this.filter_player[player_i] === $(`.added_player:eq(${i})`)["0"].player_info){
                return true
            }
        } return false
    }

    this.remove_players = function(id) {
        $(`[id=${id}]`).remove()
    }
    //
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