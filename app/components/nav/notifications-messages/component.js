import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    seeAllDidClick: function () {
      this.get('router').transitionTo('prototype.notifications');
    }
  },
  notifications: Ember.inject.service('notifications'),
  dropDownIsOpen: false,
  click: function () {
  	this.toggleProperty('dropDownIsOpen');
  },
  classNames: ['notifications-container']
});
