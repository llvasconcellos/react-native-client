
'use strict';

var React = require('react-native');

var {
  Navigator,
  StyleSheet,
  AppRegistry,
  View,
  Text
} = React;


var BaseConfig = Navigator.SceneConfigs.FadeAndroid;


var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  //springTension: 100,
  //springFriction: 1,
  // Use our custom gesture defined above
  gestures: false
});

var HomeScreen = require('../common/HomeScreen');
var PickTask = require('../common/PickTask');
var Mapper = require('../common/Mapper');
var TimerMixin = require('react-timer-mixin');

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);

var MapswipeClient = React.createClass({

    mixins: [TimerMixin],
    state: {

    },

    _renderScene(route, navigator) {
      if(route.id === 1) {
        return <HomeScreen navigator={navigator}/>
      } else if(route.id === 2) {
        return <PickTask navigator={navigator}/>
      } else if(route.id === 3) {
        return <Mapper navigator={navigator}/>
      }

     },

    _configureScene(route) {
      return CustomSceneConfig;
    },
    render() {
      return (
        <Navigator
          initialRoute={{id: 1, }}
          renderScene={this._renderScene}
          configureScene={this._configureScene} />
      );
    }
});

module.exports = MapswipeClient;
