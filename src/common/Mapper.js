'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  TimerMixin,
  PanResponder
} from 'react-native';

var fullWidth = Dimensions.get('window').width; //full width

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var deltaX = 0;

var Swiper = React.createClass({

  mixins: [SetIntervalMixin], // Use the mixin

  state: {
    offset: 0
  },

  getInitialState: function() {
    return {offset: 0};
  },

  _resetDelta: function() {
    deltaX = 0;
  },

  gestureStart: 0,
  currentOpacity: 1, // lower this by 0.01 to trigger fadeout over 500ms
  currentImage: 2045,

  backgroundImage: function() {
    if(this.currentOpacity < 1 && this.currentOpacity >= 0) {
      this.currentOpacity -=0.05;
    } else if(this.currentOpacity < 0.10) {
      var nextImage = 1967 + Math.ceil(Math.random() * 100);
      this.currentImage = nextImage;
      this.currentOpacity = 1;
    }

    return (
      <View {...this._panResponder.panHandlers} style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: ( deltaX >= 0 ?'#f05933' : '#007F00')
          }}>
        <Text style={{
          backgroundColor: '#e8e8e8',
          fontSize: 20,
          width: fullWidth,
          textAlign: 'center'
          }}>Swipe right if you find a village, left if you do not</Text>
        <Image source={{uri:'https://s3.amazonaws.com/mapswipe-static/images/'+this.currentImage+'.png'}} style={{
          flex: 1,
          resizeMode: 'stretch',
          marginRight: this.state.offset,
          width: fullWidth,
          opacity: this.currentOpacity
          }}
          onLoadEnd={() => this._resetDelta()}
          />
      </View>
    );
  },

  tick: function() {
    this.setState({offset: deltaX});
  },

  componentDidMount: function() {
    var self = this;
    this.setInterval(self.tick, 1000/60); // Call a method on the mixin
    alert("This is a prototype! Loading time will be gone in actual release. ")
  },

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
        console.log(gestureState);
      },

      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log(gestureState);
        console.log("Release");
        deltaX = (gestureState.x0 - gestureState.moveX) * 2;
        console.log(this.state.offset);
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        if(deltaX > 100 || deltaX < -100) {
          this.currentOpacity = 0.9; // triggers switch
        } else {
          deltaX = 0;
        }

        console.log("Release");
        console.log(gestureState);
      },

      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },

      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  },

  render: function() {
    return (
      this.backgroundImage()
    );
  }

});

var Mapper = React.createClass({
  mixins: [TimerMixin],
  render: function() {
    return (
      <Swiper/>
    );
  },
});


module.exports = Mapper;
