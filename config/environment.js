/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'stogora-app',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'self' static.ak.facebook.com s-static.ak.facebook.com",
      'script-src': "'self' 'unsafe-inline' connect.facebook.net/ connect.facebook.net/ http://google.com *.googleapis.com maps.gstatic.com http://platform.twitter.com/widgets.js",
      'font-src': "'self' 'unsafe-inline' fonts.gstatic.com",
      'connect-src': "'self' maps.gstatic.com *.facebook.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com *.s3.amazonaws.com *.fbcdn.net",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com",
      'media-src': "'self'",
      'frame-src': "*.facebook.com"
    }
  };

  ENV['g-map'] = {
    libraries: ['places', 'geometry']
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.mainAPIServer = '';
    ENV['g-map'].key = 'AIzaSyCKrSuGFozIqIQFFSuMK2-EeGbtqc59Mwo';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.mainAPIServer = '/api';
    ENV['g-map'].key = 'AIzaSyD9DT84rjY-ARKlqb6eJfUENo68-TvX_ZQ';
  }

  ENV['ember-simple-auth'] = {
    base: {
      store: 'session-store:local-storage'
    },
    routeAfterAuthentication: 'prototype',
    baseURL: '/prototype'
  };

  return ENV;
};
