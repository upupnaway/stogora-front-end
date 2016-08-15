import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    close: function(){
      this.$('#checkout-modal').modal('hide');
    },
    expand: function(){
      this.$('#checkout-modal').modal('show');
    },
  }
});
