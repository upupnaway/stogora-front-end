import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      stags: this.store.findAll('stag'),
      threads: this.store.findAll('listing'),
    });
  }
});
