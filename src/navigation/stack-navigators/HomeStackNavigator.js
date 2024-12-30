/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {createStackNavigator} from '@react-navigation/stack';

// components
import HomeScreen from '../../screens/HomeScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import UserProfileScreen from '../../screens/UserProfileScreen.js';
import SearchProductScreen from '../../screens/SearchProductScreen';
import BrandScreen from '../../screens/BrandScreens';
import ProductListByCategoryScreen from '../../screens/ProductListByCategoryScreen';

import About from '../../screens/AboutUsScreen';
import Contact from '../../screens/ContactUsScreen';

// contexts

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  const headerShow = route => {
    return true;
  };

  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: headerShow(route.name),
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#183153',
          height: 50,
        },
        headerLeft: () =>
          route.name === 'Home' ? (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.headerLeft}>
              <FontAwesome
                name="bars"
                size={25}
                color="#fff"
                style={{padding: 5}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.headerLeft}>
              <FontAwesome
                name="bars"
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
      <>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: (
              <View>
                <Image
                  source={require('../../assets/icon/headerLogo.png')}
                  style={styles.headerImage}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{
            title: 'User Profile',
            headerTitleAlign: 'left',
          }}
        />
        {/*Product Detail*/}
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({navigation}) => ({
            title: 'Product Details',
            headerTitleAlign: 'left',
          })}
        />
        {/*Brands*/}
        <Stack.Screen
          name="Brand"
          component={BrandScreen}
          options={{
            title: 'Brands',
            headerTitleAlign: 'left',
            brandData: 'data',
          }}
        />
        <Stack.Screen
          name="ProductListByCategory"
          component={ProductListByCategoryScreen}
          options={{
            title: 'Products',
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="SearchProduct"
          component={SearchProductScreen}
          options={{
            title: 'Search product Home',
          }}
        />

        {/*About*/}
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: 'About',
            headerTitleAlign: 'left',
          }}
        />
        {/*Contact*/}
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            title: 'Contact',
            headerTitleAlign: 'left',
          }}
        />
      </>
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
    marginRight: 10,
  },
  headerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerSearchIcon: {
    marginLeft: 10,
  },
  headerUserIcon: {
    marginLeft: 10,
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
  // Belasea Logo
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

export default HomeStackNavigator;
