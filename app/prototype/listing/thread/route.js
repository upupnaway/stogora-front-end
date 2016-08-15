import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      thread: this.store.peekRecord('listing', params.id),
      comments: this.store.query('listing-comment', { filter: { listing: params.id} }),
    });
  }
});
