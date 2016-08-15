import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		messageSubmitDidClick: function (msg) {
			var self = this,
			  conversation,
			  newMessage;
			if (msg) {
				conversation = this.get('model');
				newMessage = this.store.createRecord('message', {
				  message: msg,
				  conversation: conversation
				});
			  newMessage.save().then(function () {
			  	self.resetMessage();
			  });
			}
		}
	},
	resetMessage: Ember.observer('model', function () {
		this.set('userInputMsg', '');
	}),
  userInputMsg: ''
});
