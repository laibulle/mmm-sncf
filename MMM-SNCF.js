Module.register("MMM-SNCF",{
    // Default module config.
    defaults: {
      key: ""
  	},
    // Override dom generator.
    getDom: function() {
        Log.log(this.name + ' is started ma couille!');
        var wrapper = document.createElement("div");
        //wrapper.innerHTML = this.config.text;
        wrapper.innerHTML = "Hello SNCF";
        return wrapper;
    },
    start: function() {
      Log.log(this.name + ' is started!');
      //SncfApi.withCredentials(this.config.key, '');
    }
});
