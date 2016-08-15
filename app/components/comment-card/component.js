import Ember from 'ember';

export default Ember.Component.extend({
  timePosted: Ember.computed('comment.datePosted', function(){
    return moment.unix(this.get('comment.timestamp')).fromNow();
  })
});
