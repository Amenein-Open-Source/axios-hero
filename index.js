import axios from "axios";

const AxiosHero = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    Vue.mainAxiosInstance = axios.create(options.baseConfig); // Initiate axios instance
    Vue.Calls = {}; // Initiate empty call object
    // Plugin's main function
    Vue.makeRequest = function (n, p) {
      // Pass config data to the call
      Vue.Calls[n].data = p.data;
      Vue.Calls[n].params = p.params;
      Vue.Calls[n].headers = p.headers;
      if (p.p != null) {
        var url = Vue.Calls[n].pattern;
        Vue.Calls[n].p.forEach((param) => {
          url = url.replace("{" + param.name + "}", p.p[param.name]);
        });
        Vue.Calls[n].url = url;
      } else {
        Vue.Calls[n].url = Vue.Calls[n].pattern;
      }
      // Vue.Calls[n].url = Vue.Calls[n].url.replace("{id}", p.p["id"]);
      return Vue.mainAxiosInstance(Vue.Calls[n]);
    };
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.mixin({
      // Anything added to a mixin will be injected into all components.
      // In this case, the mounted() method runs when the component is added to the DOM.
      created() {
        // Loop through all calls
        options.calls.forEach((call) => {
          Vue.Calls[call.name] = call; // Initiate the call
        });
      },
    });
  },
};

export default AxiosHero;
