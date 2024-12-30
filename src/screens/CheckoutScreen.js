import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Platform} from 'react-native';
import Checkout from '../components/Checkout/Checkout';
import Loader from '../components/Loader/loader';
import EmptyCart from '../components/Cart/EmptyCart';
import {BASE_URL} from '../api/api';
import {useIsFocused} from '@react-navigation/native';

const CheckoutScreen = ({navigation}) => {
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Detects if the screen is focused

  useEffect(() => {
    if (isFocused) {
      // Fetch data each time the screen is focused
      fetchCartData();
    }
  }, [isFocused]);

  // Cart Fetch Data
  const fetchCartData = async () => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list`);
      const responseData = await response.json();
      setCartItem(responseData.cart);
    } catch (error) {
      console.log('Error fetching cart data:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {cartItem?.exist ? (
            <Checkout
              cartItem={cartItem}
              loading={loading}
              navigation={navigation}
            />
          ) : (
            <EmptyCart navigation={navigation} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
});

export default CheckoutScreen;
