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
  TimerMixin
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');
var myIcon = (<Icon name="rocket" size={30} color="#900" />);
var Button = require('react-native-material-button');


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

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

var ScrollingBackground = React.createClass({

  state: {
    viewStyle: {
      height: 250
    }
  },


 mixins: [SetIntervalMixin], // Use the mixin
 getInitialState: function() {
   return {offset: 0};
 },

 nextOffset: 2,

 backgroundImage: function() {

   if(this.state.offset > 500) {
     this.nextOffset = -1;
   } else if(this.state.offset < -500) {
     this.nextOffset = 1;
   }
   return (
   <Image source={require('image!map_new')} style={{
     flex: 1,
     resizeMode: 'stretch',
     marginRight: this.state.offset,
     height: height
   }} />
 )
},
tick: function() {
  this.setState({offset: this.state.offset + this.nextOffset});
},
 componentDidMount: function() {
   var self = this;
   this.setInterval(self.tick, 1000/50); // Call a method on the mixin
 },

 render: function() {
   return (
     this.backgroundImage()
   );
 }
});



var HomeScreen = React.createClass({
  mixins: [TimerMixin],

  /**
  Animates the background by setting the offset to positive if it reaches maxX, negative
  if it reaches minX
  todo(pim): make sure it doesn't constantly re-render the image, instead just adds to the offset
  */

  _onContinue: function() {
    this.props.navigator.push({id:2,});
  },

  render: function() {
    return (

      <View style={styles.container}>
        <View>
        <ScrollingBackground/>
        </View>

        <TouchableHighlight style={styles.buttonArea} onPress={this._onContinue}>
          <View>
             <Text style={styles.button}>

             <Icon name="map-o" size={15} style={styles.mappingIcon} /> Find Your Mission</Text>
             </View>
           </TouchableHighlight>
             <View style={styles.logoContainer}>
             <Image source={require('image!logo_mm')} style={styles.logoImage} />
            <Text style={styles.slogan}>Crowdsourcing critical imagery</Text>
             </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
  width: width,
  position: 'absolute',
  top: 0,
  left: 0,
  alignItems: 'center'
  },
  slogan: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
 logoImage: {
   flex: 1,
   resizeMode: 'cover',
   marginTop: 30
 },
 button: {
   marginTop: 15,
   marginBottom: 15,
   fontFamily: 'Cochin',
   color: 'white',
   shadowColor: '#212121',
   shadowOpacity: 0.8,
   shadowRadius: 2,
   textAlign: 'center',
   fontSize: 15,
   alignItems:'center'
 },
 mappingIcon: {
   paddingRight: 20
 },
 buttonArea: {
   backgroundColor: '#f42a2b',
   width: (width - 40),
   borderRadius: 5,
   marginBottom: 10,
   left: 20,
   right: 0,
   bottom: 10,
   position: 'absolute',
 }
});

module.exports = HomeScreen;
