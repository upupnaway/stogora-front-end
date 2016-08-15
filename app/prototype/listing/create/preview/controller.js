import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    confirmListing:function(){
      var self = this;
      var listing = this.get('model');
      debugger;
      listing.set('active',true);
      listing.save().then(function(){
        self.transitionToRoute('prototype');
      });
    }
  }
});
