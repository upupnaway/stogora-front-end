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
  },
  urlForQueryRecord: function (query, modelName)  {
    return config.mainAPIServer + '/followings/user/' + query.filter.followingId;
  }, 
  buildURL: function (modelName, id, snapshot, requestType, query) {
    var base_result = this._super(modelName, id, snapshot, requestType, query)
    if (requestType == 'createRecord') {
      base_result += '/';
    }
    return base_result;
  }
});
