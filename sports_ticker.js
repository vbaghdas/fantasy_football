
var timePerTickerTraversal = 36000;


$(document).ready(function() {

    sportsTicker = new SportsTicker;
    sportsTicker.ajaxCall()

});

function SportsTicker () {

    this.ajaxCall = function () {
        $.ajax({
            url: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/daily_game_schedule.json?fordate=20171203',
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
    this.success = function (response) {
        var $tickerItem = $('<marquee>',{
            class: 'tickerItem',
            scrollamount: '15'
        });
        for (var i = 0; i < response.dailygameschedule.gameentry.length; i++) {
            var awayTeam = response.dailygameschedule.gameentry[i].awayTeam.Name;
            var homeTeam = response.dailygameschedule.gameentry[i].homeTeam.Name;
            var time = response.dailygameschedule.gameentry[i].time;
            var $span = $('<span>',{
                text: awayTeam + ' vs ' + homeTeam + ' @ ' + time
            });
            $($tickerItem).append($span);
        }
        $('.sportsTicker').append($tickerItem);
    };
    this.error = function (response) {
        console.log('error', response);
        }
}


var sportsTicker = null;





















// function SportsTicker () {
// var tickerItems = [];
// var currentTicker = 0;
//
// function transitionItem(){
//     tickerItems[currentTicker].animate({
//         left: '-25%'
//     }, timePerTickerTraversal,'linear',function(){
//         $(this).css('left','100%')
//     });
//
// }
// function startTransition(){
//     setInterval(function(){
//         console.log('starting '+currentTicker)
//         transitionItem();
//         currentTicker++;
//         if(currentTicker===tickerItems.length){
//             $('.tickerItem').css('left','100%');
//             currentTicker = 0;
//         }
//
//     },timePerTickerTraversal/tickerItems.length);
//
// }


