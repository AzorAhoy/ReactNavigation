import React, { Component } from 'react';
import {View, Text, 
        StyleSheet,
} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';

import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View 
        style = {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
      >
        <Text> Home! </Text>
      </View>
    );
  }
}
class SettingsScreen extends Component {
  render() {
    return (
        <View 
        style = {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
      >
        <Text> Settings! </Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
});
