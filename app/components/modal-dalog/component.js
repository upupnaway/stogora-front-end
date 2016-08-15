import Ember from 'ember';

export default Ember.Component.extend({
  sendCloseAction: function(){
    this.sendAction('close');
  },
  didInsertElement: function(){
    this.$('.modal').modal();
    this.$('.modal').on('hidden.bs.modal', this.sendCloseAction.bind(this));
  },
  willDestroyElement: function() {
    this.$('.modal').off('hidden.bs.modal');
  }
});
