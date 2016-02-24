var {StyleSheet, Platform} = require('react-native');
var {MKColor} = require('react-native-material-kit');
import React, {
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width; //full width

module.exports = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  cardTitleStyle : {
    color: '#F5FCFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10, marginBottom: 20,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
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
    borderRadius: 5,
    marginBottom: 10,
  }
});
