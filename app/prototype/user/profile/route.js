import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var followingPromise = this.store.queryRecord('following', { filter: { followingId: params.id } }).catch(function () {
      return null;
    });
    return Ember.RSVP.hash({
      currentUserProfileId: parseInt(params.id, 10),
      followingStatus: followingPromise,
      userProfile: this.store.peekRecord('user', params.id),
      threads: this.store.peekAll('listing').filterBy('userId', params.id)
      // threads: this.store.findAll('listing').then(function(listingArr){
      //   var returnArr=[];
      //   for(var i = 0; i < listingArr.length; i++){
      //     if(listingArr[i].sellerId === params){
      //       returnArr.push(listingArr[i]);
      //     }
      //   }
      //   return returnArr;
      // })
    });
  }
});
