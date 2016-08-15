import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  timestamp: DS.attr('number'),
  user: DS.belongsTo('user'),
  listing: DS.belongsTo('listing')
});
