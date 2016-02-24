/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class MapswipeClient extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/map.jpg')} style={styles.backgroundImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
   flex: 1,
   resizeMode: 'cover', // or 'stretch'
 }
});

AppRegistry.registerComponent('MapswipeClient', () => MapswipeClient);
