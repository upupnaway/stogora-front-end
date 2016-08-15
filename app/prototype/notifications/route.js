import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.$.ajax({
      dataType: 'json',
      type: 'GET',
      url: Ember.prefixAPIServer('/notifications'),
      xhrFields: {
        withCredentials: true
      }
    });
  }
});
