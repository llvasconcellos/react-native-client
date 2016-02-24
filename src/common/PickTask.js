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
  ScrollView,
} from 'react-native';



import {
  MKButton,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';

var pybossa_path = {
    task: "/api/task",
    project: "/api/project",
    taskrun: "/api/taskrun",
    user: "/api/user"
}
var ScrollableTabView = require('react-native-scrollable-tab-view');

var Icon = require('react-native-vector-icons/FontAwesome');
var myIcon = (<Icon name="rocket" size={30} color="#900" />);
var Button = require('react-native-material-button');

import { setTheme, MKColor } from 'react-native-material-kit';

// customize the material design theme
setTheme({
  primaryColor: MKColor.Purple,
  primaryColorRGB: MKColor.RGBPurple,
  accentColor: MKColor.Amber,
});

const theme = getTheme();

const styles = require('./styles');


const Cards = React.createClass({


  _onMapping: function() {
    this.props.navigator.push({id:3,});
  },

  render(){
    theme.cardTitleStyle.color = "#E8E8E8";
      theme.cardTitleStyle.fontSize = 15;
    var base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
    var action = (<Text> My action</Text>);
    var menu = (
       <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >
        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
      </MKIconToggle>
    );
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        {/* Here the magic happens*/}
          <View style={theme.cardStyle}>
            <Image source={require('image!shabunda')} style={theme.cardImageStyle}/>
            <Text style={theme.cardTitleStyle}>Find villages in Shabunda, Congo</Text>
            <View  // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
              style={{
                padding : 15,
              }}
              >
              <Text style={[theme.cardContentStyle, {padding:0}]}>
                Tiny villages in the green hills of South Kivu, Democratic Republic of the Congo. Imagery is sparse here; I've chosen an area where there's some Bing sat coverage. The villages are tiny, but actually quite visible as they shine brightly through the surrounding deep green.
              </Text>
            </View>
            <View style={theme.cardMenuStyle}>{menu}</View>
            <View style={theme.cardActionStyle}>
            <TouchableHighlight style={styles.buttonArea} onPress={this._onMapping}>
              <View>
                 <Text style={styles.button}>

                 <Icon name="map-o" size={15} style={styles.mappingIcon} /> Start Mapping</Text>
                 </View>
               </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
});

module.exports = Cards;

var FlowPage = React.createClass({


  render: function() {
    return (
      <View>
      <Text>flow</Text>
      </View>
    );
  }
});
module.exports = FlowPage;

var JestPage = React.createClass({


  render: function() {
    return (
      <View>
      <Text>jest</Text>
      </View>
    );
  }
});
module.exports = JestPage;

var PickTask = React.createClass({
  render: function() {
    return (
      <ScrollableTabView>
             <Cards tabLabel="Not Started" navigator={this.props.navigator}/>
             <FlowPage tabLabel="In Progress" />
             <JestPage tabLabel="Finished" />
      </ScrollableTabView>
    );
  }
});


module.exports = PickTask;
