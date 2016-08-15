import Ember from 'ember';

export default Ember.Component.extend({
  timePosted: Ember.computed('thread.datePosted', function(){
    return moment(this.get('thread.datePosted')).fromNow();
  })
});
