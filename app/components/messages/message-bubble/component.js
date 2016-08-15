import Ember from 'ember';

export default Ember.Component.extend({
	isViewingUser: false,
	classNames: ['message-bubble-container'],
	englishDate: Ember.computed('message.timestamp', function () {
	  var timestamp = this.get('message.timestamp');
	  return moment.unix(timestamp).fromNow();
	})
});
