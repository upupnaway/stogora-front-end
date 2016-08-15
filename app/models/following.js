import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('number'),
  followingId: DS.attr('number'),
  following: DS.belongsTo('user')
});
