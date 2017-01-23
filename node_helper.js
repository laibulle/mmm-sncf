const NodeHelper = require("node_helper");
const sncf = require('./sncf');

module.exports = NodeHelper.create({
  // Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "START") {
			this.createFetcher(payload.config);
			return;
		}
	},
  createFetcher: function(config) {
    const self = this;
    sncf.key = config.key;
    const places = {};

    config.journeys.forEach(function(i) {
      places[i.from] = null;
      places[i.to] = null;
    });

    var total = 0;
    const placesCount = Object.keys(places).length;
    for(var name in places){
      let curName = name;
      sncf.findPlace(curName, function(err, place){
        places[curName] = place;
        total++;

        if(total == placesCount) {
          self.startFetching(places, config.journeys);
        }
      });
    }
  },

  startFetching(places, journeys) {
    var total = 0;
    const self = this;
    const journeysCount = Object.keys(journeys).length;
    const fullJourneys = [];

    for(var journey in journeys){
      let currentJourney = journeys[journey];
      let from = places[currentJourney.from];
      let to = places[currentJourney.to];
      let journeysList = [];

      sncf.findJourneys(from, to, function(err, foundJourney){
        journeysList.push(foundJourney.journeys[0]);
        sncf.next(foundJourney.links[0].href, function(err, foundJourney){
          journeysList.push(foundJourney.journeys[0]);
          sncf.next(foundJourney.links[0].href, function(err, foundJourney){
            journeysList.push(foundJourney.journeys[0]);
            fullJourneys.push(journeysList);
            total++;

            if(total == journeysCount) {
              let traffic = {
        				traffic: fullJourneys
        			};
              self.sendSocketNotification("UPDATED", traffic);

              setTimeout(function(){
                self.startFetching(places, journeys);
              }, 3* 60 * 1000);
            }
          });
        });
      });
    }
  }
});
