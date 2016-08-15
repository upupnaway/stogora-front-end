import DS from 'ember-data';

export default DS.Model.extend({
  userName: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  profilePhoto: DS.attr('string'),
  stags: DS.attr(),
  posts: DS.attr(),
  rating: DS.attr('number'),
  points: DS.attr('number'),
  listings: DS.hasMany('listing'),
  fullName: Ember.computed('firstName', 'lastName', function () {
  	return this.get('firstName') + ' ' + this.get('lastName');
  })
});
