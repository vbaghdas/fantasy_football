$(document).ready( () => {
    sportsTicker = new SportsTicker;
    sportsTicker.ajaxCall()
});

function SportsTicker () {

    //AJAX call returns daily game schedule as a Javascript object
    this.ajaxCall = function () {
        $.ajax({
            url: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2018-playoff/full_game_schedule.json?date=until-tomorrow',
            dataType: 'json',
            method: 'get',
            success: this.success,
            error: this.error,
            async: false,
            headers: {
                "Authorization": "Basic " + btoa("vbaghdas" + ":" + "consoles1")
            }
        });
    };
    //Success function from ajax call takes response as the parameter, filters game schedule and pushes to the array
    this.success = function (response) {
        var teamScheduleArr = [];
        for (var i = 0; i < response.fullgameschedule.gameentry.length; i++) {
            var awayTeam = response.fullgameschedule.gameentry[i].awayTeam.Abbreviation;
            var homeTeam = response.fullgameschedule.gameentry[i].homeTeam.Abbreviation;
            var time = response.fullgameschedule.gameentry[i].time;
            teamScheduleArr.push(awayTeam + ' vs ' + homeTeam + ' @ ' + time);
        }

        //Renders and animates the array of the game schedule on the DOM using jQuery with a set interval
        function initializeCrawler(){
            var teamScheduleArrItems = teamScheduleArr.slice();
            var crawlTime = 3000;
            var newCrawlerTime = 6000;
            setInterval(addItemToCrawler, crawlTime);
            function addItemToCrawler(){
                if(teamScheduleArrItems.length < 1){
                    return;
                }

                //Removes first element from the array and creates a new item to render on the DOM
                var nextItem = teamScheduleArrItems.shift();
                var $div = $('<div>', {
                    text: nextItem,
                    class: 'tickerItem'
                });
                $('.sportsTicker').append($div);
                
                //Animates the scrolling text to the left of the viewport and removes them
                $div.animate({left: "-40%"}, newCrawlerTime, 'linear', function(){
                    teamScheduleArrItems.push($(this).text());
                    $(this).remove();
                });
            }
        }
        initializeCrawler(teamScheduleArr);
    };

    this.error = function (response) {
        console.log('Error: ',response)
    }
}

var sportsTicker = null;