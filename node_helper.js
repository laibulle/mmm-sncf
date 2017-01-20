const sncf = require('./sncf');

module.exports = NodeHelper.create({
  start: function() {
    sncf.key = '9265c5d7-d957-4837-8096-bd27b7595ef8';
    sncf.findPlace("lille", function(err, place1){
      console.log(place1);
      sncf.findPlace("armentieres", function(err, place2){
        console.log(place2);
        sncf.findJourneys(place1, place2, function(err, journeys){
          console.log(journeys);
        });
      });
    });
  }
});
