import EmailAuthenticator from '../authenticators/email'

export function initialize(container, application) {
  application.register('authenticator:email', EmailAuthenticator);
}

export default {
  name: 'email-auth',
  before: 'ember-simple-auth',
  initialize: initialize
};
