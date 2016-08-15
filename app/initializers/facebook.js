import FacebookAuthenticator from '../authenticators/facebook'

export function initialize(container, application) {
  application.register('authenticator:facebook', FacebookAuthenticator);
}

export default {
  name: 'facebook-auth',
  before: 'ember-simple-auth',
  initialize: initialize
};
