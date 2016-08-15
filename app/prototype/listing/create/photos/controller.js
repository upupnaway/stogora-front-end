import Ember from 'ember';
import config from 'stogora-app/config/environment';

export default Ember.Controller.extend({
  actions: {
    uploadPhotos: function(){
      var self = this;
      var currentListing = this.get('model');
      currentListing.save().then(function(result){
        self.transitionToRoute('prototype.listing.create.preview',result.id);
      });
      this.get('model').reload();
    }
  },
  photoUrl: Ember.computed(function() {
    return '/listings/photo/' + this.get('model').id;
  }) 
});
