import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('user', function() {
    this.route('profile',{path:'/:id'});
  });
  this.route('prototype', function() {
    this.route('index',{path:'/'});
    this.route('notifications');
    this.route('user', function() {
      this.route('profile', {path:'/:id'});
    });
    this.route('listing', function() {
      this.route('thread', {path:'/:id'});
      this.route('create', function (){
        this.route('start');
        this.route('description',{path:'/:id/description'});
        this.route('photos',{path:'/:id/photos'});
        this.route('preview',{path:'/:id/preview'});
      });
    });
    this.route('messages', function() {
      this.route('conversation', {path:'/:convoId'});
    });
    this.route('list-item', function() {
      this.route('new');
    });
  });
});

export default Router;