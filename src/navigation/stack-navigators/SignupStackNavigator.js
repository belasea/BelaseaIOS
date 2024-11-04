import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../../screens/SignupScreen';

const Stack = createStackNavigator();

const SignupStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({headerShown: false})}>
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default SignupStackNavigator;
