import Ember from 'ember';

export default Ember.Component.extend({
  timePosted: Ember.computed('listing.datePosted', function(){
    return moment(this.get('listing.datePosted')).fromNow();
  })
});
