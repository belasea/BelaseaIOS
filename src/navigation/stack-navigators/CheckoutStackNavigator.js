/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CheckoutScreen from '../../screens/CheckoutScreen';
// import InvoiceScreen from '../../screens/InvoiceScreen';
import TermsConditionScreens from '../../screens/TermsConditionScreens';

const Stack = createStackNavigator();

const CheckoutStackNavigator = ({navigation, route}) => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: true,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#183153',
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CartStack')}
            style={styles.headerLeft}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color="#fff"
              style={{padding: 5}}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <View style={styles.headerContent}>
              <Text style={styles.headerSearchIcon}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SearchProductStack', {
                      screen: 'SearchProduct',
                      params: {search_query: ''},
                    })
                  }
                  style={styles.touchableButton}>
                  <FontAwesome name="search" size={20} color="#fff" />
                </TouchableOpacity>
              </Text>
              <Text style={styles.headerSearchIcon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserProfileStack')}
                  style={styles.touchableButton}>
                  <FontAwesome name="user" size={20} color="#fff" />
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        ),
      })}>
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#183153',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      {/* <Stack.Screen
          name="Invoice"
          component={InvoiceScreen}
          options={{
            title: 'Invoice',
            headerTitleAlign: 'left',
          }}
        /> */}
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsConditionScreens}
        options={{
          title: 'Terms & Condition',
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
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

export default CheckoutStackNavigator;
