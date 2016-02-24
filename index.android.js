var React = require('react-native');

var {
  AppRegistry
} = React;

var MapswipeClient = require('./src/android/app');

AppRegistry.registerComponent('MapswipeClient', () => MapswipeClient);
