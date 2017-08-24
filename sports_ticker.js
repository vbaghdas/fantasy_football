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
        var teamScheduleArr = [];
        for (var i = 0; i < response.dailygameschedule.gameentry.length; i++) {
            var awayTeam = response.dailygameschedule.gameentry[i].awayTeam.Abbreviation;
            var homeTeam = response.dailygameschedule.gameentry[i].homeTeam.Abbreviation;
            var time = response.dailygameschedule.gameentry[i].time;
            teamScheduleArr.push(awayTeam + ' vs ' + homeTeam + ' @ ' + time);
        }
        function initializeCrawler(){
            var teamScheduleArrItems = teamScheduleArr.slice();
            var crawlTime = 2000;
            var newCrawlerTime = 6000;
            setInterval(addItemToCrawler, crawlTime);
            function addItemToCrawler(){
                if(teamScheduleArrItems.length < 1){
                    return;
                }
                var nextItem = teamScheduleArrItems.shift(); //add
                var $div = $('<div>', {
                    text: nextItem,
                    class: 'tickerItem'
                });
                $('.sportsTicker').append($div);
                $div.animate({left: "-20%"}, newCrawlerTime, 'linear', function(){
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

















// this.success = function (response) {
//     var $tickerItem = $('<marquee>',{
//         class: 'tickerItem',
//         scrollamount: '15'
//     });
//     for (var i = 0; i < response.dailygameschedule.gameentry.length; i++) {
//         var awayTeam = response.dailygameschedule.gameentry[i].awayTeam.Name;
//         var homeTeam = response.dailygameschedule.gameentry[i].homeTeam.Name;
//         var $span = $('<span>',{
//             text: awayTeam + ' vs ' + homeTeam
//         });
//         $($tickerItem).append($span);
//     }
//     $('.sportsTicker').append($tickerItem);
// };



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


