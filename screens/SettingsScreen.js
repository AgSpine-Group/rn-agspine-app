import React from 'react';
import { Text, View } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text> HI THIS IS YOUR SETTINGS SCREEN</Text>
      </View>
    );
  }
}
