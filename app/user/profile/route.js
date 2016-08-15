import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      // threads: this.store.peekAll('threads'),
      // userProfile: this.store.peekRecord('user',params.id)
      // threads: this.store.peekAll('listing').filterBy('listing.user_id',params.id)
    });
  }
});
