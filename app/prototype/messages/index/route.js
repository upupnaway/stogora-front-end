import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function () {
		var conversationsFromParent = this.modelFor('prototype.messages'),
			firstUserId;
		if (conversationsFromParent.get('length')) {
			firstUserId = conversationsFromParent.objectAt(0).get('partnerId');
			this.transitionTo('prototype.messages.conversation', firstUserId);
		}
	}
});
