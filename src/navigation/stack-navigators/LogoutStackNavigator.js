/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

const LogoutStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: true,
        headerTintColor: '#183153',
        headerStyle: {
          backgroundColor: '#FFF',
          shadowColor: '#333',
        },

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfileStack')}
            style={styles.headerLeft}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color="#183153"
              style={{padding: 5}}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <View style={styles.headerContent}>
              <Text style={styles.headerSearchIcon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchStack')}
                  style={styles.touchableButton}>
                  <FontAwesome name="search" size={20} color="#183153" />
                </TouchableOpacity>
              </Text>
              <Text style={styles.headerSearchIcon}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserProfileStack')}
                  style={styles.touchableButton}>
                  <FontAwesome name="user" size={20} color="#183153" />
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        ),
      })}
    />
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
    backgroundColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    padding: 3,
    borderRadius: 50,
  },
  headerImage: {
    ...Platform.select({
      ios: {
        width: 150,
        height: 20,
      },
      android: {
        width: 150,
        height: 20,
      },
    }),
  },
});

export default LogoutStackNavigator;
