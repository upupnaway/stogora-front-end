import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var self = this;
    if (this.store.peekRecord('listing',params.id)){
      return self.store.peekRecord('listing',params.id);
    } else {
      return self.store.find('listing',params.id);
    }
  }
});
