import Ember from 'ember';

export default Ember.Component.extend({
	notification: null,
	isDirectMessageNotification: Ember.computed('notification.type', function () {
		return this.get('notification.type') == 'message';
	}),
	isCommentNotification: Ember.computed('notification.type', function () {
		return this.get('notification.type') == 'comment';
	}),
	englishDate: Ember.computed('notification.timestamp', function () {
	  var timestamp = this.get('notification.timestamp');
	  return moment.unix(timestamp).fromNow();
	}),
	classNames: ['notification'],
	tagName: 'li'
});
