import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  quantity: DS.attr('number'),
  zipLoc: DS.attr('number'),
  sellerId: DS.attr('string'),
  photo: DS.attr(),
  description: DS.attr('string'),
  subtitle: DS.attr('string'),
  sold: DS.attr('string'),
  active: DS.attr('string'),
  userId: DS.attr('string'),
  user: DS.belongsTo('user'),
  stagId: DS.attr('number'),
  stag: Ember.computed('stagId', function(){
    return this.store.peekRecord('stag',this.get('stagId'));
  }),
  zipCode: Ember.computed.alias('zipLoc'),
  comments: DS.hasMany('listing-comment', {async: true})
});
