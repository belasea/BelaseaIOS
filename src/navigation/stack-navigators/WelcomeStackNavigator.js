import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../../screens/WelcomeScreen';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const WelcomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: false,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#183153',
          height: 50,
        },
      })}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: '',
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  // Troggle
  headerLeft: {
    marginLeft: 10,
  },
  // User Icon & Search
  headerRight: {
    marginRight: 15,
  },
  headerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerSearchIcon: {
    marginLeft: 20,
  },
  headerUserIcon: {
    marginLeft: 20,
  },
  touchableButton: {
    backgroundColor: '#183153',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    padding: 3,
    borderRadius: 50,
    overflow: 'hidden',
  },
});

export default WelcomeStackNavigator;
