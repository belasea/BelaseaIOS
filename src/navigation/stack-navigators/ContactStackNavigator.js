/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ContactUsScreen from '../../screens/ContactUsScreen';

const Stack = createStackNavigator();

const ContactStackNavigator = () => {
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
            onPress={() => navigation.navigate('UserProfileStack')}
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
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="search"
                size={20}
                color="#fff"
                style={{margin: 10}}
              />
            </View>
          </View>
        ),
      })}>
      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
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
    marginRight: 20,
  },
  headerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerSearchIcon: {
    marginLeft: 30,
  },
  headerUserIcon: {
    marginLeft: 20,
  },
});

export default ContactStackNavigator;
