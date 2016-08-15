import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    listingSubmitDidClick: function(){
      this.sendAction('action');
    }
  }
});
