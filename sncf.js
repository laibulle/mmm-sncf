const request = require('request');

module.exports = {
  key: "",
  api: "https://api.sncf.com/v1/coverage/sncf",

  findPlace: function(name, callback) {
    request(this.generateUrl(this.api + "/places?q=" + name), function (error, response, body) {
      if(error != null) {
        return callback(error, null);
      }

      const resp = JSON.parse(body);

      return callback(error, resp.places[0]);
    })
  },
  findJourneys: function(from, to, callback) {
    request(this.generateUrl(this.api + "/journeys?from=" + from.id + "&to=" + to.id), function (error, response, body) {
      if(error != null) {
        return callback(error, null);
      }

      const resp = JSON.parse(body);

      return callback(error, resp.journeys);
    })
  },
  generateUrl: function(url) {
    return {url: url, auth: {user: this.key, pass: ''} }
  }
};
