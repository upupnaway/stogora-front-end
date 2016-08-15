export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('component', 'router', 'router:main');
}

export default {
  name: 'component-router-injector',
  initialize: initialize
};
