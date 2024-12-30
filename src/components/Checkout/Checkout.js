/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {BASE_URL} from '../../api/api';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckoutForm from './CheckoutForm';
import {CartContext} from '../../contexts/CartContext';
// import {AuthContext} from '../../contexts/AuthContext';

const Checkout = ({navigation, cartItem}) => {
  // const {user} = useContext(AuthContext);
  const {totalQuantity, setTotalQuantity} = useContext(CartContext);
  const [deliveryCharge, setDeliveryCharge] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [location, setLocation] = useState('');

  // const totalItems = parseInt(cartItem?.items_count);
  const totalWeight = parseInt(cartItem?.total_weight || 0);
  const totalCost = parseFloat(cartItem?.total_cost || 0);
  const vat = parseFloat(cartItem?.vat || 0);
  const vat_percentage = cartItem?.vat_percentage;

  const totalCostWithDeliveryCharge =
    parseFloat(cartItem?.total_cost || 0) +
    parseFloat(deliveryCharge || 0) +
    parseFloat(vat || 0);

  const handleDeliveryCharge = async selectedLocation => {
    setLocation(selectedLocation);
    try {
      const response = await fetch(
        `${BASE_URL}/api/delivery-charge/${selectedLocation}/${totalWeight}/`,
      );
      const responseData = await response.json();
      if (responseData.status && responseData.result) {
        setDeliveryCharge(responseData.result.delivery_charge);
        setDeliveryMethod(responseData.result.delivery_method);
      } else {
        setDeliveryCharge('');
        setDeliveryMethod('');
      }
    } catch (error) {
      console.log('Error fetching delivery charge: ', error);
      setDeliveryCharge('');
      setDeliveryMethod('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.checkoutProcess}>
            {/*Your cart Section */}
            <View style={styles.yourCartSection}>
              {/*CartItem*/}
              <View style={styles.checkoutCartItem}>
                <View style={styles.yourCart}>
                  <Text style={styles.yourCartTitle}>Your Cart </Text>
                </View>
                <View style={styles.items}>
                  <Text style={styles.totalItems}>{totalQuantity} items</Text>
                </View>
              </View>
              {/*Product Cost*/}
              <View style={styles.checkoutProductCost}>
                <View style={styles.productCost}>
                  <Text style={styles.productCostTitle}>Product Cost </Text>
                </View>
                <View style={styles.productPrice}>
                  <Text style={styles.productPriceTitle}>৳ {totalCost}</Text>
                </View>
              </View>
              {/*vat 5% */}

              {/* <View style={styles.checkoutProductCost}>
                <View style={styles.productCost}>
                  <Text style={styles.productCostTitle}>{vat_percentage}</Text>
                </View>
                <View style={styles.productPrice}>
                  <Text style={styles.productPriceTitle}>৳ {vat}</Text>
                </View>
              </View> */}

              <View style={styles.checkoutProductCost}>
                {vat_percentage && vat ? ( // Check if both are truthy
                  <>
                    <View style={styles.productCost}>
                      <Text style={styles.productCostTitle}>
                        {vat_percentage}
                      </Text>
                    </View>
                    <View style={styles.productPrice}>
                      <Text style={styles.productPriceTitle}>৳ {vat}</Text>
                    </View>
                  </>
                ) : null}
              </View>

              {/*Delivery Charge Expected*/}
              <View style={styles.deliveryChargeContent}>
                <View style={styles.deliveryCharge}>
                  <Text style={styles.deliveryChargeTitle}>
                    Delivery Charge
                  </Text>
                </View>
                <View style={styles.deliveryPrice}>
                  {deliveryCharge ? (
                    <Text style={styles.deliveryPriceTitle}>
                      ৳ {deliveryCharge}
                    </Text>
                  ) : (
                    <Text style={styles.deliveryPriceTitle}>৳ 00</Text>
                  )}
                </View>
              </View>
              {/*Total Cost*/}
              <View style={styles.totalCostContent}>
                <View style={styles.totalCost}>
                  <Text style={styles.totalCostTitle}>Total Cost </Text>
                </View>
                <View style={styles.totalPrice}>
                  <Text style={styles.totalPriceTitle}>
                    ৳ {totalCostWithDeliveryCharge}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.deliveryMethodTitle}>Select Delivery Area</Text>
            <View style={styles.deliveryArea}>
              <View style={{flex: 1, margin: 4}}>
                <TouchableOpacity
                  onPress={() => handleDeliveryCharge('inside_dhaka')}>
                  <View
                    style={
                      location === 'inside_dhaka'
                        ? styles.insideDhakaButton
                        : styles.outSideDhakaButton
                    }>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text>
                          {location === 'inside_dhaka' ? (
                            <FontAwesome
                              name="check-circle-o"
                              size={20}
                              color="green"
                            />
                          ) : (
                            ' '
                          )}
                        </Text>
                      </View>
                      <View style={{flex: 4}}>
                        <Text style={{color: '#000'}}>Inside Dhaka</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, margin: 4}}>
                <TouchableOpacity
                  onPress={() => handleDeliveryCharge('outside_dhaka')}>
                  <View
                    style={
                      location === 'outside_dhaka'
                        ? styles.insideDhakaButton
                        : styles.outSideDhakaButton
                    }>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text>
                          {location === 'outside_dhaka' ? (
                            <FontAwesome
                              name="check-circle-o"
                              size={20}
                              color="green"
                            />
                          ) : (
                            ' '
                          )}
                        </Text>
                      </View>
                      <View style={{flex: 4}}>
                        <Text>Outside Dhaka</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/*Address*/}
            <View style={styles.addressForm}>
              <Text style={styles.addAddress}>Add Address</Text>
              {/*from CheckoutForm*/}
              <CheckoutForm
                navigation={navigation}
                deliveryCharge={deliveryCharge}
                deliveryMethod={deliveryMethod}
                setLocation={setLocation}
                cartItem={cartItem}
                setTotalQuantity={setTotalQuantity}
                // user={user}
              />
            </View>
            <View style={styles.checkoutMargin} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginBottom: 0,
      },
    }),
  },

  checkoutProcess: {
    flex: 1,
    margin: 5,
    marginTop: 15,
  },
  yourCartSection: {
    overflow: 'hidden',
    marginBottom: 10,
  },
  addAddress: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
    color: '#000',
  },
  checkoutProcessTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 20,
  },
  checkoutCartItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  yourCart: {
    flex: 4,
  },
  yourCartTitle: {
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
    padding: 3,
    color: '#000',
  },
  items: {
    flex: 1,
    marginRight: 5,
  },
  totalItems: {
    textAlign: 'center',
    backgroundColor: '#6C757D',
    borderRadius: 7,
    padding: 3,
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 14,
    overflow: 'hidden',
  },
  checkoutProductCost: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  productCost: {
    flex: 1,
    marginRight: 5,
  },
  productCostTitle: {
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
    color: '#000',
  },
  productPrice: {
    flex: 1,
    marginRight: 5,
  },
  productPriceTitle: {
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
    textAlign: 'right',
    color: '#000',
  },
  deliveryChargeContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  deliveryArea: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  deliveryCharge: {
    flex: 1,
    marginRight: 5,
  },
  deliveryChargeTitle: {
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
    color: '#000',
  },
  deliveryPrice: {
    flex: 1,
    marginRight: 5,
    color: '#000',
  },
  deliveryPriceTitle: {
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
    textAlign: 'right',
    color: '#000',
  },
  totalCostContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 1,
    marginRight: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: '#183153',
    color: '#FFF',
    overflow: 'hidden',
  },
  totalCost: {
    flex: 1,
    marginLeft: 3,
  },
  totalCostTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 3,
  },
  totalPrice: {
    flex: 1,
  },
  totalPriceTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    color: '#FFF',
    marginRight: 5,
  },

  deliveryMethodButton: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  // deliveryMethod
  deliveryMethod: {
    overflow: 'hidden',
  },
  deliveryMethodTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
  },
  deliveryMethodContent: {
    flexDirection: 'row',
  },
  deliveryOption: {
    flex: 1,
    borderBottomColor: 'black',
    borderRightWidth: 1,
  },
  insideDhakaTitle: {
    marginBottom: 10,
    fontSize: 14,
  },
  outsideDhakaTitle: {
    marginBottom: 10,
    fontSize: 14,
  },
  deliveryChargeMl: {
    flex: 2,
  },
  deliveryChargeMlTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  deliveryChargeMlContent: {
    marginLeft: 15,
  },
  deliveryChargeMessage: {
    marginTop: 8,
  },
  insideDhakaMessage: {
    textAlign: 'justify',
  },
  outSideDhakaMessage: {
    textAlign: 'justify',
  },

  // Address Form
  addressForm: {
    flex: 1,
  },

  checkoutAddressForm: {
    height: 40,
    marginLeft: 2,
    marginRight: 3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#D9D9D9',
    marginBottom: 10,
  },
  checkoutAddressNoteForm: {
    height: 60,
    marginLeft: 2,
    marginRight: 3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#D9D9D9',
    marginBottom: 10,
  },
  placeAnOrder: {
    padding: 7,
    backgroundColor: '#183153',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#183153',
    color: '#FFF',
    marginBottom: 10,
    overflow: 'hidden',
  },

  deliveryMethodCard: {
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 7,
  },

  insideDhakaButton: {
    padding: 5,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#F9C65D',
    color: 'black',
  },
  outSideDhakaButton: {
    padding: 5,
    backgroundColor: '#ccccca',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#ccccca',
    color: 'black',
  },
  checkoutMargin: {
    ...Platform.select({
      ios: {
        marginBottom: 50,
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
});
export default Checkout;
