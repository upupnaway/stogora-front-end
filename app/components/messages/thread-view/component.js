import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  messagesSorted: Ember.computed('messages', function () {
    var messages = this.get('messages');
    return messages.sortBy('timestamp');
  }),
  didInsertElement: function () {
    var element = this.$();
    Ember.run.scheduleOnce('afterRender', this, function() {
       element.parent().scrollTop(element[0].scrollHeight);
    });
  }
});
