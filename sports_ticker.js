
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
    },
        this.success = function (response) {
            // for (var i = 0; i < response.articles.length; i++) {
            //     console.log('success', response.articles[i]);
            // }
            console.log('success for sports ticker', response.dailygameschedule.gameentry);
            this.error = function (response) {
                console.log('error', response);
            }
        }
}


var sportsTicker = null;




