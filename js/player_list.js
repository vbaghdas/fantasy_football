$(document).ready( () => {
    playerList = new PlayerList;
});

function PlayerList() {
    this.teamArr = Object.keys(playertwitter.teamArray)
    this.players = [];
    this.activeTeam = '';
    this.filterPlayer = [];

    //AJAX call returns NFL Player Roster as a Javascript object
    $.ajax({
        method: 'GET',
        url: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2018-playoff/daily_dfs.json',
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": "Basic " + btoa("vbaghdas" + ":" + "consoles1")
        },
        success: (response) => {
            console.log(response.dailydfs.dfsEntries[0]);
            for(var i = 0; i < response.dailydfs.dfsEntries[0].dfsRows.length; i++) {
                this.players.push({
                    firstName: response.dailydfs.dfsEntries[0].dfsRows[i].player.FirstName,
                    lastName: response.dailydfs.dfsEntries[0].dfsRows[i].player.LastName,
                    team: (response.dailydfs.dfsEntries[0].dfsRows[i].team) ? response.dailydfs.dfsEntries[0].dfsRows[i].team.Name : 'No Team',
                    position: response.dailydfs.dfsEntries[0].dfsRows[i].player.Position,
                    date: response.dailydfs.dfsEntries[0].dfsRows[i].game.date,
                    game: response.dailydfs.dfsEntries[0].dfsRows[i].game.homeTeam.Name +' vs '+ response.dailydfs.dfsEntries[0].dfsRows[i].game.awayTeam.Name,
                    salary: response.dailydfs.dfsEntries[0].dfsRows[i].salary,
                    fantasyPoints: response.dailydfs.dfsEntries[0].dfsRows[i].fantasyPoints,
                });
                this.players[i].hashList = '#' + this.players[i].team + ' ' + '#' +this.players[i].firstName + this.players[i].lastName + ' ' + '#' + 'nfl'
            }
        },
    });

    // Initialize and call the create team list function on page load
    this.init = () => {
        this.createTeamList();
    };

    // Create the player list on the DOM as a dropdown menu
    this.createPlayerList = () => {
        this.filterPlayer = this.players.filter((player) => {return player.team === this.activeTeam});
        var $playerList = $('<ul>',{
            class: 'dropdown-menu'
        });
        for (var i = 0; i < this.filterPlayer.length; i++) {
            var $playerItem = $('<li>',{
                text: this.filterPlayer[i].firstName + ' ' + this.filterPlayer[i].lastName + ' , ' + this.filterPlayer[i].team,
                id: i
            });
            this.selectedPlayer($playerItem[0], this.filterPlayer[i]);
            if(this.checkPlayerList(i) === false) {
                $($playerList).append($playerItem);
            }
        }
        $('#playerDropdown').append($playerList);
    };

    // Create the team list on the DOM as a dropdown menu
    this.createTeamList = () => {
        var $teamList = $('<ul>', {
            class: 'dropdown-menu'
        });
        for (var i = 0; i < this.teamArr.length; i++) {
            var $teamItem = $('<li>', {
                text: this.teamArr[i],
            });
            this.selectedTeam($teamItem[0], i);
            $($teamList).append($teamItem);
        }
        $('#teamDropdown').append($teamList);
    };

    // Select player and append Daily DFS to the DOM
    this.selectedPlayer = ( (playerList) => {return (element, playerObj) => {
        element.playerInfo = playerObj;
        $(element).click( function(){
            
            // Added Player, Team, and Position
            var $addedPlayer = $('<div>',{
                class: 'addedPlayer',
                text: this.textContent + ' - ' + this.playerInfo.position
            });
            playerList.removePlayers(this.id);

            // Game and Date
            var $game = $('<div>',{
                class: 'game',
                text: 'Game: ' + this.playerInfo.game + ' on ' + this.playerInfo.date
            });

            // Salary
            var $salary = $('<div>',{
                class: 'salary',
                text: 'Salary: $' + this.playerInfo.salary
            });

            // Fantasy Points
            var $fantasyPoints = $('<div>',{
                class: 'fantasyPoints',
                text: 'Fantasy Points: ' + this.playerInfo.fantasyPoints
            });
            
            // Append players and stats to the lineup on the DOM
            $addedPlayer[0].playerInfo = playerObj;
            $('.playerList').append($addedPlayer);
            $($addedPlayer).append($game, $salary, $fantasyPoints);
            $('#fantasyPicks').css('visibility', 'initial');

            // Send team object to twitter feed
            playertwitter.twitterFeed(playerObj.team);
            
            // Select team animation and hide select player button
            $('#selectTeam').text('Select Team');
            $('#selectTeam').css('animation', 'pulse 5s infinite');
            $('#selectPlayer').css('visibility', 'hidden');
        });
    }})(this);

    // Check player and remove from drop down list if already added
    this.checkPlayerList = (playerIndex) => {
        for(var i = 0; i < this.filterPlayer.length; i++) {
            if(!$(`.addedPlayer:eq(${i})`)['0']) {
                return false
            }
            if(this.filterPlayer[playerIndex] === $(`.addedPlayer:eq(${i})`)["0"].playerInfo){
                return true
            }
        } return false
    }

    this.removePlayers = (id) => {
        $(`[id=${id}]`).remove()
    }

    // When team is selected, create player list
    this.selectedTeam = ( (playerList) => { return (element, i) => {
        element.team_info = this.teamArr[i];
        $(element).on('click', function(){
            $('#teamDropdown li').removeClass('active');
            $(this).addClass('active');
            $('#playerDropdown').find('ul').slice(0).remove();
            playerList.activeTeam = this.team_info;
            playerList.createPlayerList();

            // Display team name in button, remove animation, and animate select player button
            $('#selectTeam').text(playerList.activeTeam);
            $('#selectTeam').css('animation', 'none');
            $('#selectPlayer').css('visibility', 'initial');
            $('#selectPlayer').css('animation', 'pulse2 5s infinite');
        })
    }})(this);
    this.init();
}

var playerList = null;