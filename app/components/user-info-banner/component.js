import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    /**
     * Call the parent action passing true
     */
    followDidClick: function () {
      this.sendAction('action', true);
    },
    /**
     * Call the parent action passing false
     */
    unfollowDidClick: function () {
      this.sendAction('action', false);
    }
  },
  stars: Ember.computed('user.rating', function(){
    var rating = Math.round(this.get('user.rating')), returnArr = [];
    for(var i = 0; i < rating; i++){
      returnArr.push(true);
    }
    while(returnArr.length < 5){
      returnArr.push(false);
    }
    return returnArr;
  }),
  /**
   * Show only when the user is logged in and they are not viewing their own page
   */
  shouldShowFollowButton: Ember.computed('currentUserProfileId', 'session.data.authenticated.id', function () {
    return this.get('session.isAuthenticated') && this.get('session.data.authenticated.id') !== this.get('currentUserProfileId');
  }),
  // Expected to be passed from the parent controller
  followingStatus: null,
  currentUserProfileId: null
});
