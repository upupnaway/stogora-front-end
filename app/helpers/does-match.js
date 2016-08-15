import Ember from 'ember';

export function doesMatch(params) {
  return params[0] === params[1];
}

export default Ember.Helper.helper(doesMatch);