import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OrderConfirmation from '../../screens/OrderConfirmation';

const Stack = createStackNavigator();

const OrderConfirmationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Order Confirmation"
        component={OrderConfirmation}
        options={{
          title: 'Order Confirmation',
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderConfirmationStackNavigator;
