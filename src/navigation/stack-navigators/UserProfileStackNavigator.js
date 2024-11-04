/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PersonalInformationScreen from '../../screens/PersonalInformationScreen.js';
import UserProfileScreen from '../../screens/UserProfileScreen';
import TrackingMyParcelScreen from '../../screens/TrackingMyParcelScreen';
import PurchaseOrderScreen from '../../screens/PurchaseHistoryScreen';
import ReturnPolicyScreen from '../../screens/ReturnPolicyScreen';
import SecurityPrivacyScreens from '../../screens/SecurityPrivacyScreens';
import TermsConditionScreens from '../../screens/TermsConditionScreens';
import ContactUsScreen from '../../screens/ContactUsScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';
import SettingScreen from '../../screens/SettingScreen';

const Stack = createStackNavigator();

const UserProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: true,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#183153',
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
        name="User Profile"
        component={UserProfileScreen}
        options={{
          title: 'User Profile',
          headerTitleAlign: 'left',
        }}
      />
      {/*Personal Information*/}
      <Stack.Screen
        name="Personal Information"
        component={PersonalInformationScreen}
        options={{
          title: 'User Profile',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Tracking My Parcel"
        component={TrackingMyParcelScreen}
        options={{
          title: 'Tracking My Parcel',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Purchase History"
        component={PurchaseOrderScreen}
        options={{
          title: 'Purchase History',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Return Policy"
        component={ReturnPolicyScreen}
        options={{
          title: 'Return & Policy',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Security Privacy"
        component={SecurityPrivacyScreens}
        options={{
          title: 'Security & Privacy',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Terms & Condition"
        component={TermsConditionScreens}
        options={{
          title: 'Terms & Condition',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactUsScreen}
        options={{
          title: 'Contact Us',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutUsScreen}
        options={{
          title: 'About Us',
          headerTitleAlign: 'left',
        }}
      />
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

export default UserProfileStackNavigator;
