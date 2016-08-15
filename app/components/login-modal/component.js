import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    close: function(){
      this.$('.login-modal').modal('hide');
    },
    expand: function(){
      this.$('.login-modal').modal('show');
    },
    switchToRegister: function(){
      this.send('close');
      $('.signup-modal').modal('show');
    },

    /**
     * Perform POST request with authentication information after we verify for non null strings
     */
    submitAuthentication: function() {
      var email = this.get('email'),
        password = this.get('password'),
        authPromise;
      if (this.verifyCredentials(email, password)){
        authPromise = this.get('session').authenticate('authenticator:email', {email: email, password: password});
        authPromise.then(this.loginSuccess.bind(this), this.loginError.bind(this));
      }
    },
    signInViaFacebook: function() {
      var authPromise = this.get('session').authenticate('authenticator:facebook', null);
      authPromise.then(this.loginSuccess.bind(this), this.loginError.bind(this));
    }
  },
  email: '',
  password:'',
  emailError: false,
  passwordError: false,
  previousTransition: null,
  errorFlashMessage: null,
  isLoading: false,
  /**
   * Make sure username and password is not null
   * @param {string} email - Email to check
   * @param {string} password - Password to check
   * @returns {boolean} - True if username and password are not null
   */
   verifyCredentials: function (email, password){
    var isOk = true;
    if(email.length > 0){
      if (email.indexOf('a') === -1) {
        this.set('emailError',true);
        isOk = false;
      } else {
        this.set('emailError', false);
      }
    } else {
      this.set('emailError',true);
      isOk = false;
    }
    /**
      we should probaly change this conditional..
    **/
    if (password.length > 2){
      this.set('passwordError', false);
    } else {
      this.set('passwordError', true);
      isOk = false;
    }
    return isOk;
   },
  /**
   * Callback function for success from server. Reset fields and transition to authenticated route.
   * @param {object} data - JSON data from server
   */
   loginSuccess: function () {
    this.resetFields();
    this.send('close');
   },
    /**
   * Depending on the status and responseJSON set the flash message to the apropriate message.
   * @param {object} response - Response from the server
   */
   loginError: function (response){
    this.set('isLoading', false);
    if(response.status === 401) {
      this.set('errorFlashMessage', 'Invalid Username/Password');
    } else if(response.status === 403) {
      if(response.responseJSON && response.responseJSON.statusMessage === 'no facebook account') {
        this.set('errorFlashMessage', 'There is no account associated with the facebook account. Please register.');
      }
    }
   },
  /**
   * Null all fields for security reasons
  */
  resetFields: function(){
    this.setProperties({
      email: '',
      password: '',
      errorFlashMessage: null
    });
  },
  userInformation: null

});
