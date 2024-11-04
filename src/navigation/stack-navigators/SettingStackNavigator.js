/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SettingScreen from '../../screens/SettingScreen';

const Stack = createStackNavigator();

const SettingStackNavigator = () => {
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
        name="Setting"
        component={SettingScreen}
        options={{
          title: 'Setting',
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

export default SettingStackNavigator;
