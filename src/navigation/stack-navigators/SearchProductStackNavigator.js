/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchProductScreen from '../../screens/SearchProductScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';

const Stack = createStackNavigator();

const SearchProductStackNavigator = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (data, navigation) => {
    setSearchQuery(data);

    setTimeout(() => {
      navigation.navigate('SearchProductStack', {
        screen: 'SearchProduct',
        params: {
          search_query: data,
        },
      });
    }, 1000);
  };

  const handleGoBack = navigation => {
    setSearchQuery('');
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
            <View style={styles.mainSearchWrap}>
              <View style={styles.mainSearch}>
                <TextInput
                  name="search_product"
                  placeholder="Search Product or Brand"
                  onChangeText={text => handleSearchChange(text, navigation)}
                  value={searchQuery}
                  style={styles.mainSearchInput}
                  selectionColor="#183153"
                />
                <View style={styles.mainSearchIcon} />
              </View>
            </View>
          </View>
        ),
      })}>
      <Stack.Screen
        name="SearchProduct"
        component={SearchProductScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({navigation, route}) => ({
          title: '',
          headerTitleAlign: 'left',
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  // Troggle
  headerLeft: {
    marginLeft: 15,
  },
  // User Icon & Search
  headerRight: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...Platform.select({
      ios: {
        width: '160%',
      },
      android: {
        width: '100%',
      },
    }),
  },

  headerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginRight: 5,
  },
  headerSearchIcon: {
    marginLeft: 2,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 5,
  },
  headerUserIcon: {
    marginLeft: 15,
  },
  checkoutAddressNoteForm: {
    height: 60,
    marginLeft: 2,
    marginRight: 3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    marginBottom: 10,
    color: '#fff',
  },
  mainSearchWrap: {
    width: '100%',
  },
  mainSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'gray',
    // height: 35,
    borderRadius: 10,
    marginLeft: -15,
    marginRight: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  mainSearchInput: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginLeft: 10,
    marginTop: 0,
  },
  mainSearchIcon: {
    width: 50,
  },
  searchIcon: {
    marginRight: 10,
    width: 50,
    height: 35,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#183153',
    borderWidth: 0.4,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchProductStackNavigator;
