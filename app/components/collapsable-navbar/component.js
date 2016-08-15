import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    logUserOut: function () {
      this.get('session').invalidate();
    }
  },
  stag: 'f82',
  profilePhoto: "https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xft1/v/t1.0-9/11209747_10152847183228201_1678818176835035994_n.jpg?oh=6c9c1918d717ae13c4d91922242ffda2&oe=568158FB"
});
