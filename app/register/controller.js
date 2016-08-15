import Ember from 'ember';
import config from '../config/environment'

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    /**
     * Validate the fields, then perform a POST request to the api server.
     */
    submitRegistration: function () {
      var self = this,
        email = this.get('email'),
        password = this.get('password');
      if (this.verifyFields()) {
        this.set('isLoadingAjax', true);
        $.ajax({
          crossDomain: true,
          data: {
            email: email,
            password: password,
            firstName: this.get('firstName'),
            lastName: this.get('lastName')
          },
          dataType: 'json',
          error: self.registrationError.bind(self),
          type: 'POST',
          success: function (data) {
            this.registrationSuccess(data, 'email', {email: email, password: password});
          }.bind(self),
          url: config.mainAPIServer + '/user/register',
          xhrFields: {
            withCredentials: true
          }
        });
      }
    },
    /**
     * Call the facebook api for login requesting for the public progile, email, and friends.
     */
    registerWithFacebook: function () {
      var fbScopeRequest = {
        scope: 'public_profile, email, user_friends'
      };
      FB.login(this.facebookSuccessAuthentication.bind(this), fbScopeRequest);
    }
  },
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  // Error Message Flags
  errorFlashMessage: null,
  isLoadingAjax: false,
  firstNameError: false,
  lastNameError: false,
  emailNameError: false,
  passwordError: false,
  confirmPasswordError: false,
  /**
   * Reset the fields and transition to the authenticated route
   * @param {object} data - This is assumed to be the JSON response from the server for the registration POST
   */
  registrationSuccess: function (data, authenticator, authData) {
    this.get('session').authenticate('authenticator:' + authenticator, authData);
    this.resetFields();
    this.transitionToRoute('index');
  },
  /**
   * Depending on the response status and JSON contents, flash the apropriate error message.
   * @param  {object} response - jQuery response object
   */
  registrationError: function (response) {
    this.set('isLoadingAjax', false);
    if (response.status === 403) {
      if (response.responseJSON.statusMessage ) {
        if (response.responseJSON.statusMessage == 'email duplication') {
          this.set('errorFlashMessage', 'The given email cannot be used twice');
        } else if (response.responseJSON.statusMessage == 'facebook duplication') {
          this.set('errorFlashMessage', 'There is already an account associated with the facebook account');
        }
      }
    } else if (response.status >= 500) {
      this.set('errorFlashMessage', 'We are experiencing intermitent problems on the server');
    }
  },
  /**
   * Reset all the fields to null for security purposes
   */
  resetFields: function () {
    this.setProperties({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  },
  /**
   * Check if the user successfully logged into facebook then perform a POST request to the api
   * server with the facebook credentials.
   * @param  {object} fbResponse - Facebook response object from the login api
   */
  facebookSuccessAuthentication: function (fbResponse) {
    var self = this;
    if (fbResponse.status == 'connected') {
      $.ajax({
        crossDomain: true,
        data: fbResponse.authResponse,
        dataType: 'json',
        error: self.registrationError.bind(self),
        success: function (data) {
          this.registrationSuccess(data, 'facebook', fbResponse);
        }.bind(self),
        type: 'POST',
        url: config.mainAPIServer + '/user/register-fb',
        xhrFields: {
          withCredentials: true
        }
      });
    } else {
      this.set('errorFlashMessage', 'There was a problem registering with facebook');
    }
  },
  /**
   * First veirfy that the last name and first name are not null, then verify that the email is a valid
   * email address. Next make sure the password is non empty and matches the confirmation password
   * @retuens {boolean} - True if all fields pass the verification criteria
   **/
  verifyFields: function () {
    var isOk = true,
      collectedFields = {
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        email: this.get('email'),
        password: this.get('password'),
        confirmPassword: this.get('confirmPassword')
    };
    if (collectedFields.firstName.length > 0) {
      this.set('firstNameError', false);
    } else {
      this.set('firstNameError', true);
      isOk = false;
    }

    if (collectedFields.lastName.length > 0) {
      this.set('lastNameError', false);
    } else {
      this.set('lastNameError', true);
      isOk = false;
    }

    if (collectedFields.email.length > 0) {
      if (collectedFields.email.indexOf('@') === -1) {
        this.set('emailError', true);
        isOk = false;
      } else {
        this.set('emailError', false);
      }
    } else {
      this.set('emailError', true);
      isOk = false;
    }

    if (collectedFields.password.length > 0) {
      if (collectedFields.password !== collectedFields.confirmPassword) {
        this.set('confirmPasswordError', true);
        this.set('passwordError', true);
        isOk = false;
      } else {
        this.set('confirmPasswordError', false);
        this.set('passwordError', false);
      }
    } else {
      this.set('passwordError', true);
      isOk = false;
    }
    return isOk;
  },
});
