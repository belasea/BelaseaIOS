/* eslint-disable radix */
/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import {BASE_URL} from '../../api/api';

const CheckoutForm = ({
  navigation,
  deliveryCharge,
  deliveryMethod,
  setLocation,
  setTotalQuantity,
  // user,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // first_name: user?.first_name,
    // last_name: user?.last_name,
    // email: user?.email,
    // contact_number: user?.contact_number,

    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    address: '',
    location: '',
    city: '',
    notes: '',
  });

  const stockOutAlert = list => {
    const message = list.join('\n\n');
    Alert.alert(
      'Sorry, this item is sold out. Please remove it from your cart.',
      message,
    );
    // Alert.alert('Sorry, the item you selected is currently sold out', message);
    // Alert.alert('Stock Out Items is sold out already.', message);
  };

  const leftStockAlert = list => {
    const message = list.join('\n\n');
    Alert.alert('Left Stock Items', message);
  };

  const handleDeliveryArea = () => {
    Alert.alert(
      'Oops, Delivery Area',
      'Please select a delivery area to proceed.',
    );
  };

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const resetFormData = () => {
    setFormData({
      // first_name: user?.first_name,
      // last_name: user?.last_name,
      // email: user?.email,
      // contact_number: user?.contact_number,
      first_name: '',
      last_name: '',
      email: '',
      contact_number: '',
      address: '',
      location: '',
      city: '',
      notes: '',
    });
  };

  const handleCheckout = async () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.contact_number ||
      !formData.address ||
      !formData.location ||
      !formData.city
    ) {
      Alert.alert('Oops !', 'Please fill in all fields to proceed');
      return;
    }

    // Validate email format if provided
    if (formData.email && !isValidEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Validate phone number format if provided
    if (
      formData.contact_number &&
      !isValidPhoneNumber(formData.contact_number)
    ) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/invoices/api/checkout-api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          delivery_charge: parseInt(deliveryCharge),
          delivery_method: parseInt(deliveryMethod),
          platform: 'Mobile',
        }),
      });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const responseData = await response.json();

      if (responseData.status === false) {
        if (
          responseData.stock_out_list &&
          responseData.stock_out_list.length > 0
        ) {
          stockOutAlert(responseData.stock_out_list);
        }
        if (
          responseData.left_stock_list &&
          responseData.left_stock_list.length > 0
        ) {
          leftStockAlert(responseData.left_stock_list);
        }
        setLoading(false);
        navigation.navigate('CartStack', {screen: 'Cart'});
        return;
      } else {
        navigation.navigate('InvoiceStack', {
          screen: 'Invoice',
          params: {
            InvoiceId: responseData.context.invoiceId,
          },
        });
        setTotalQuantity(0);
        setLoading(false);
        setLocation('');
        resetFormData();
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setLoading(false);
    }
  };

  const isValidEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = phoneNumber => {
    // Regular expression for Bangladesh phone number validation
    // Accepts numbers with or without country code (+880)
    const phoneRegex = /^(?:\+880|0)(?:\d{10})$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <View>
      <View style={styles.mainForm}>
        <View style={styles.formFlex}>
          <View style={styles.btnBottomStyle}>
            <TextInput
              name="first_name"
              placeholder="First Name * "
              selectionColor="#183153"
              style={styles.checkoutAddressForm}
              value={formData.first_name}
              onChangeText={text => handleInputChange('first_name', text)}
            />
          </View>
        </View>
        <View style={styles.formFlex}>
          <View style={styles.btnBottomStyle}>
            <TextInput
              name="last_name"
              placeholder="Last Name * "
              selectionColor="#183153"
              style={styles.checkoutAddressForm}
              value={formData.last_name}
              onChangeText={text => handleInputChange('last_name', text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnBottomStyle}>
        <TextInput
          name="email"
          placeholder="Email Address"
          keyboardType="email-address"
          selectionColor="#183153"
          style={styles.checkoutAddressForm}
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
        />
      </View>
      <View style={styles.btnBottomStyle}>
        <TextInput
          name="contact_number"
          placeholder="Phone Number * "
          style={styles.checkoutAddressForm}
          keyboardType="numeric"
          selectionColor="#183153"
          // editable={false}
          value={formData.contact_number}
          onChangeText={text => handleInputChange('contact_number', text)}
        />
      </View>
      <View style={styles.btnBottomStyle}>
        <TextInput
          name="address"
          placeholder="Address (Ex. street name, street number, house/flat number) * "
          selectionColor="#183153"
          style={styles.checkoutAddressForm}
          value={formData.address}
          onChangeText={text => handleInputChange('address', text)}
        />
      </View>
      <View style={styles.btnBottomStyle}>
        <TextInput
          name="location"
          placeholder="Your area ( Ex. Mirpur, Dhanmondi ) *"
          style={styles.checkoutAddressForm}
          selectionColor="#183153"
          value={formData.location}
          onChangeText={text => handleInputChange('location', text)}
        />
      </View>
      <View style={styles.btnBottomStyle}>
        <TextInput
          name="city"
          placeholder="City ( Ex. Dhaka, Khulna, Chittagong ) *"
          style={styles.checkoutAddressForm}
          selectionColor="#183153"
          value={formData.city}
          onChangeText={text => handleInputChange('city', text)}
        />
      </View>
      <TextInput
        name="notes"
        placeholder="Notes for order, delivery (optional). e.g. specific delivery date or packaging *"
        style={styles.checkoutAddressNoteForm}
        selectionColor="#183153"
        value={formData.notes}
        onChangeText={text => handleInputChange('notes', text)}
      />

      <View style={styles.termsConditionWrap}>
        <View>
          <Text style={styles.byClickingOrder}>
            By Clicking Place an order you also agree to all the
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditionStack')}>
            <Text style={styles.termsConditionColor}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Checkout button */}
      {deliveryCharge ? (
        <TouchableOpacity style={styles.placeAnOrder} onPress={handleCheckout}>
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Place your order'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleDeliveryArea}>
          <Text style={styles.placeAnOrder}>Checkout</Text>
        </TouchableOpacity>
      )}

      {/* Loading indicator */}
      {loading && (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      )}

      <View style={styles.checkoutBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainForm: {
    flex: 1,
    flexDirection: 'row',
  },
  formFlex: {
    flex: 1,
  },
  checkoutAddressForm: {
    height: 40,
    marginLeft: 2,
    marginRight: 3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    color: 'black',
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
  placeOrderDisable: {
    padding: 7,
    backgroundColor: 'darkgrey',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#999999',
    color: '#FFF',
    marginBottom: 10,
    // overflow: "hidden",
    // cursor: "not-allow"
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  btnBottomStyle: {
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
  },
  loadingIndicator: {
    color: '#007bff',
    marginTop: 20,
  },
  termsConditionWrap: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  byClickingOrder: {
    fontSize: 13,
    marginRight: 2,
  },
  termsConditionColor: {
    color: 'blue',
    fontSize: 13,
  },

  checkoutBottom: {
    marginBottom: 50,
  },
});

export default CheckoutForm;
