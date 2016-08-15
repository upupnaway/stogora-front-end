import DS from "ember-data";
import config from 'stogora-app/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.mainAPIServer,
  ajax: function(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = {
      withCredentials: true
    };
    return this._super(url, method, hash);
  }
});
