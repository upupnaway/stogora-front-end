import Ember from 'ember';

var stag = {}
stag.threadCount  = 10;
stag.name = 'everything';
stag.users = 56821;

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      activeStag: this.store.peekRecord('stag',1),
      threads: this.store.peekAll('listing')
    });
  }
});
