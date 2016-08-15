import DS from 'ember-data';

export default DS.Model.extend({
  authorId: DS.attr('string'),
  userName: DS.attr('string'),
  upvotes: DS.attr('number'),
  profilePhoto: DS.attr('string'),
  datePosted: DS.attr('date'),
  comment: DS.attr('string')
});
