import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    /**
     * If the status is true, create a new following and upon success from the server, set the model's followingStatus
     * to the new instance. If the status is false, delete the model's followingStatus if there is a successful delete
     * from the server
     * @param  {boolean} status - Indicates wether to create or delete a following
     */
    changeFollowStatus: function (status) {
      var userToFollowId = this.get('model.currentUserProfileId'),
        self = this;
        following;
      // Create new following
      if (status) {
        var following = this.store.createRecord('following', {
          followingId: userToFollowId
        });
        following.save().then(function () {
          self.set('model.followingStatus', following);
        });
      } else {
        following = this.get('model.followingStatus');
        following.deleteRecord();
        following.save().then(function () {
          self.set('model.followingStatus', null);
        });;
      }
    }
  }
});
