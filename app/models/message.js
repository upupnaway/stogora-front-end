import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  sender: DS.attr('string'),
  senderId: DS.attr('number'),
  recipient: DS.attr('string'),
  timestamp: DS.attr('number'),
  conversation: DS.belongsTo('conversation')
});
