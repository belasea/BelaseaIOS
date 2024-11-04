import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Platform} from 'react-native';
import Checkout from '../components/Checkout/Checkout';
import Loader from '../components/Loader/loader';
import EmptyCart from '../components/Cart/EmptyCart';
import {BASE_URL} from '../api/api';

const CheckoutScreen = ({navigation}) => {
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  // Cart Fetch Data ================
  const fetchCartData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list`);
      const responseData = await response.json();
      setCartItem(responseData.cart);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching cart data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.container}>
            {cartItem.exist ? (
              <Checkout
                cartItem={cartItem}
                loading={loading}
                navigation={navigation}
              />
            ) : (
              <EmptyCart navigation={navigation} />
            )}
          </View>
        </>
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
