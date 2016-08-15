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

  authenticate(fbResponse) {
    var fbScopeRequest = {
      scope: 'public_profile, email, user_friends'
    };
    return new Ember.RSVP.Promise(function (resolve, reject) {
      /**
       * First check the status of the facebook response to make sure the user is logged in. If so 
       * perform a POST to the api server with the facebook credentials, else flash a message
       * informing the user there was an error with signing in with facebook.
       * @param  {object} fbResponse - Response object from the facebook api
       */
      var facebookSuccessAuthentication = function (fbResponse) {
        var self = this;
        if (fbResponse.status == 'connected') {
          $.ajax({
            data: fbResponse.authResponse,
            dataType: 'json',
            type: 'POST',
            url: config.mainAPIServer + '/login-fb',
            xhrFields: {
              withCredentials: true
            }
          }).then(function (data) {
            // Upon Success, resolve
            resolve(data);
          }, function (resp) {
            // Upon failiure, reject
            reject(resp);
          });
        } else {
          reject();
        }
      }
      if (fbResponse) {
        facebookSuccessAuthentication(fbResponse);
      } else {
        FB.login(facebookSuccessAuthentication, fbScopeRequest);
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
