import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.peekAll('stag').filter(function(item, index, enumerable){
      if(item.get('name') === "everything"){
        return false;
      } else {
        return true;
      }
    });
  }
});
