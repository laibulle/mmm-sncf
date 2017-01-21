function strToDate(dateStr) {
  return dateStr.substring(9,11) + "h" + dateStr.substring(11,13);
}

function getJourneysDom(journeys) {
  var table = document.createElement("table");
  table.className = 'small';

  if (journeys.length == 0) {
    return table;
  }

  for (var j in journeys) {
    var journey = journeys[j];

    var row = document.createElement("tr");
    row.className = "dimmed light";
    table.appendChild(row);

    var departure = document.createElement("td");
    departure.innerHTML = strToDate(journey.departure_date_time);
    row.appendChild(departure);

    var departure = document.createElement("td");
    departure.innerHTML = Math.floor(journey.duration / 60) + " mn";
    row.appendChild(departure);
  }

  return table;
}

function getJourneysTitleDom(journeys) {
  var title = document.createElement("div");

  if (journeys.length == 0) {
    return title;
  }

  let from = journeys[0].sections[0].from;
  let to = journeys[0].sections[journeys[0].sections.length - 1].to;

  title.className = 'small';
  title.innerHTML = from.administrative_region.name + " - " + to.administrative_region.name;

  return title;
}

Module.register("MMM-SNCF",{
    // Default module config.
    defaults: {
      key: ""
  	},
    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
      if (notification === "UPDATED") {
        this.traffic = payload.traffic;
        this.updateDom();
      }
    },
    // Override dom generator.
    getDom: function() {
      var wrapper = document.createElement("div");
      Log.info(this.traffic);

      for(var i in this.traffic) {
        let journeys = this.traffic[i];

        wrapper.appendChild(getJourneysTitleDom(journeys));
        wrapper.appendChild(getJourneysDom(journeys));
      }

      return wrapper;
    },
    start: function() {
      this.traffic = [];

      this.sendSocketNotification("START", {
				config: this.config
			});
    }
});
