import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../../screens/LoginScreen';

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({headerShown: false})}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
