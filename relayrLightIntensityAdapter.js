// ------------
// Connects the abstract power controller to
// an actual Wunderbar through the relayr API.
// ------------
var relayrLightIntensityAdapter = (function () {

    var relayr = require('./relayrApp');

    // Connect using the keys:
    relayr.app.connect(relayr.authToken, relayr.wunderbarId);

    // Listen and do stuff
    console.log('registering');
    relayr.app.on('data', function (topic, msg) {

        // diagnostic logging
        var logData = {
            source : 'RELAYR LIGHT SENSOR',
            data : msg
        };
        console.log(logData);


        msg.readings.forEach(function (elem){
           if (elem.meaning == 'luminosity'){
               changeListener(Math.max(0, Math.min(100, Math.round(elem.value*100/1800))));
           } 
        });
    });


    // Return an object exposed to the public
    return {

        /**
         *
         * @param (function(int)) callback that receives the current intensity of detected light as a percentage. Int value between 0 and 100;
         */
        onLightIntensityChanged : function(callback)
        {
            changeListener = callback;
        }

    };
})();

module.exports = relayrLightIntensityAdapter;
