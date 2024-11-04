import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Cart from '../components/Cart/Cart';
import Loader from '../components/Loader/loader';
import EmptyCart from '../components/Cart/EmptyCart';
import {CartContext} from '../contexts/CartContext';
import {BASE_URL} from '../api/api';

const CartScreen = ({navigation}) => {
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const {totalQuantity, setTotalQuantity} = useContext(CartContext);

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
      infoAlert('Error fetching cart data:', error);
    }
  };

  const handleIncreaseQuantity = async productId => {
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
          increase: true,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === false) {
        infoAlert('Error', responseData.msg);
      } else {
        // Update quantity to context
        setTotalQuantity(responseData?.total_quantity);
        fetchCartData();
        infoAlert(
          'Quantity Increased',
          'Quantity has been increased successfully.',
        );
      }
    } catch (error) {
      infoAlert('Error adding to cart:', error);
    }
  };

  const handleDecreaseQuantity = async productId => {
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
          decrease: true,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === false) {
        infoAlert('Error', responseData.msg);
      } else {
        // Update quantity to context
        setTotalQuantity(responseData?.total_quantity);
        fetchCartData();
        // Display success alert
        infoAlert(
          'Quantity Decreased',
          'Quantity has been decreased successfully.',
        );
      }
    } catch (error) {
      infoAlert('Error adding to cart:', error);
    }
  };

  // RemoveItemFromCart Function ====================
  const handleRemoveItemFromCart = async itemId => {
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-remove/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        // infoAlert('Item Removed', responseData.msg);
        setTotalQuantity(responseData?.items_count);
        fetchCartData();
      }
    } catch (error) {
      // Handle error
      infoAlert('Error removing item:', error);
    }
  };

  // Custom Message ============================
  const infoAlert = (title, message, itemId) => {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => handleRemoveItemFromCart(itemId),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {cartItem.exist ? (
            <View style={styles.container}>
              <ScrollView>
                <Cart
                  cartItem={cartItem}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  infoAlert={infoAlert}
                />
              </ScrollView>

              {/* Total Amount ===================*/}
              <View style={styles.totalAmountContent}>
                <View style={styles.totalAmountInfo}>
                  <Text style={styles.totalAmountTitle}>Total Amount : </Text>
                </View>
                <View style={styles.totalAmountRight}>
                  <Text style={styles.totalAmountPrice}>
                    {' '}
                    ৳ {cartItem?.total_cost}
                  </Text>
                </View>
              </View>
              {/*Proceed to Order*/}
              <TouchableOpacity
                onPress={() => navigation.navigate('CheckoutStack')}>
                <View style={styles.proceedOrder}>
                  <Text style={styles.proceedOrderTitle}>
                    Proceed to Order{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <EmptyCart navigation={navigation} />
            </View>
          )}
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
  totalAmountContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    backgroundColor: '#293352',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
    color: '#FFF',
    paddingBottom: 7,
  },
  totalAmountInfo: {
    flex: 1,
    color: '#FFF',
  },
  totalAmountTitle: {
    color: '#FFF',
  },
  totalAmountRight: {
    flex: 1,
    justifyCenter: 'flex-end',
    alignItems: 'flex-end',
  },
  totalAmountPrice: {
    color: '#FFF',
  },

  proceedOrder: {
    padding: 10,
    backgroundColor: '#E04F54',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  proceedOrderTitle: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CartScreen;
