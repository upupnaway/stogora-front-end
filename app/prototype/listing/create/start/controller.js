import Ember from 'ember';

export default Ember.Controller.extend({
  mapData: Ember.computed("model.[]", function(){
    var model = this.get("model");

    return model.map(function(item){
      return {text: item.get('name'), id: item.get('id'), description: item.get('slug')};
    });
  }),
  stag: {},
  actions: {
    listingNext: function(){
      //here we want to transition to the listing create route of the selected stag
      var self = this;
      var listingInstance = self.store.createRecord('listing',{'stagId': self.stag.id});
      listingInstance.save().then(function(result){
        self.transitionToRoute('prototype.listing.create.description',result.id);
      });
    }
  }
});
