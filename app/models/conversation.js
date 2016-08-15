import DS from 'ember-data';

export default DS.Model.extend({
  partnerId: DS.attr('string'),
  partnerName: DS.attr('string'),
  userImageUrl: DS.attr('string'),
  lastMessaged: DS.attr('number'),
  lastMessageBlurb: DS.attr('string'),
  messages: DS.hasMany('message')
});
