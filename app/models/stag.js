import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  numListings: DS.attr('number'),
  numUsers: DS.attr('number'),
  slug: DS.attr('string'),
  stagPhoto: DS.attr('string')
});
