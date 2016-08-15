import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submitNewCommentDidClick: function () {
      var comment = this.get('newCommentMessage'),
        self = this,
        listingComment;
      if (comment) {
        listingComment = this.store.createRecord('listing-comment', {listing: this.get('model.thread'), message: comment});
        listingComment.save().then(function () {
          self.set('newCommentMessage', '');
        });
      }
    }
  },
  session: Ember.inject.service('session'),
  newCommentMessage: ''
});
