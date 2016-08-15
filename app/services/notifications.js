import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  notifications: [],
  /**
   * Upon init, perform the initial polling of the server for notifications
   */
  initialPolling: function () {
    this.delayedPolling(0);
  }.on('init'),
  /**
   * Call the pollServer function after the given milliseconds of elapsed
   * 
   * @param  {Number} interval - Delay the request to the server by this many milliseconds
   */
  delayedPolling: function(interval) {
    if (this.get('session.isAuthenticated')) {
      Ember.run.later(this, function() {
        this.pollServer();
      }, interval);
    }
  }.observes('session.isAuthenticated'),
  /**
   * Perform AJAX request to server for notifications passing credentials information. Call
   * the pollSuccess if request succeeds
   */
  pollServer: function() {
    Ember.$.ajax({
      dataType: 'json',
      type: 'GET',
      url: Ember.prefixAPIServer('/notifications'),
      xhrFields: {
        withCredentials: true
      }
    }).then(this.pollSuccess.bind(this));
  },
  /**
   * #TODO Setup smarter merging of lists
   *
   * Merge the list from the server to the current list
   * 
   * @param  {Object} data - JSON response returned from server
   */
  pollSuccess: function (data) {
    if (data && data.notifications) {
      this.set('notifications', data.notifications);
    }
    //this.delayedPolling(5000);
  }
});