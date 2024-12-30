/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SearchProductScreen from '../../screens/SearchProductScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';

const Stack = createStackNavigator();

const SearchProductStackNavigator = () => {
  const handleGoBack = navigation => {
    navigation.goBack();
  };

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
          <TouchableOpacity onPress={() => handleGoBack(navigation)}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color="#fff"
              style={{marginLeft: 10}}
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
        name="SearchProduct"
        component={SearchProductScreen}
        // Custom title
        options={{
          title: 'Search',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({navigation, route}) => ({
          title: 'Product Details',
          headerTitleAlign: 'left',
        })}
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

export default SearchProductStackNavigator;
