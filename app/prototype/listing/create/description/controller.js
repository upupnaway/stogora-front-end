import Ember from 'ember';

export default Ember.Controller.extend({
  actions : {
    listingSumbmitDidClick: function(){
      var self = this;
      var currentListing = this.get('model');
      currentListing.save().then(function(result){
        self.transitionToRoute('prototype.listing.create.photos',result.id);
      });
    }
  },
  validateFields: function(){
    //validate title
    if(  !this.get('listing.title')|| !this.listing.price || !this.listing.quantity){
      return false;
    } else {
      return true;
    }

  }
});
