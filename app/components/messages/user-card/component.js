import Ember from 'ember';

export default Ember.Component.extend({
  messageThread: null,

  timeSinceLastMessage: Ember.computed('messageThread.lastMessaged', function () {
    var timestamp = this.get('messageThread.lastMessaged');
    return moment.unix(timestamp).fromNow();
  }),
  classNames: ['message-user-card']
});
