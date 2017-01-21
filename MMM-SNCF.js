function strToDate(dateStr) {
  return dateStr.substring(9,11) + "h" + dateStr.substring(11,13);
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
        let from = journeys[0].sections[0].from;
        let to = journeys[0].sections[journeys[0].sections.length - 1].to;

        var title = document.createElement("div");
        title.innerHTML = from.administrative_region.name + " - " + to.administrative_region.name;
        //title.className = "small";
        wrapper.appendChild(title);

        var table = document.createElement("table");
        table.className = "small";

        for (var j in journeys) {
          var journey = journeys[j];

          var row = document.createElement("tr");
          table.appendChild(row);

          var departure = document.createElement("td");
    			departure.innerHTML = strToDate(journey.departure_date_time);
    			row.appendChild(departure);

          var departure = document.createElement("td");
    			departure.innerHTML = Math.floor(journey.duration / 60) + " mn";
    			row.appendChild(departure);
        }
        wrapper.appendChild(table);

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
