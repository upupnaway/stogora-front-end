import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment'

export default Base.extend({
  restore(data) {
    return Ember.$.ajax({
      dataType: 'json',
      type: 'GET',
      url: config.mainAPIServer + '/user/authentication-info',
      xhrFields: {
        withCredentials: true
      }
    });
  },

  authenticate(options) {
    return Ember.$.ajax({
      data: options,
      dataType: 'json',
      type: 'POST',
      url: config.mainAPIServer + '/login',
      xhrFields: {
       withCredentials: true
      }
   });
  },
  invalidate(data) {
    return Ember.$.ajax({
      url: config.mainAPIServer + '/logout',
      xhrFields: {
        withCredentials: true
      }
    });
  }
});
