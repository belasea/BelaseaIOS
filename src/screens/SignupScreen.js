/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {BASE_URL} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFirstName = text => {
    setFirstName(text);
  };

  const handleLastName = text => {
    setLastName(text);
  };

  const handleContactName = text => {
    setContactNumber(text);
  };

  const handleSetEmail = text => {
    setEmail(text);
  };

  const handlePassword = text => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!firstName || !lastName || !contactNumber || !email || !password) {
        showAlert('Validation Error', 'Please fill in all fields.');
        return;
      }

      const response = await fetch(`${BASE_URL}/account/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;

        if (token) {
          await AsyncStorage.setItem('token', token);
          setFirstName('');
          setLastName('');
          setContactNumber('');
          setEmail('');
          setPassword('');
          navigation.navigate('LoginStack');
        } else {
          showAlert(
            'Oops, an Error',
            'An error occurred. Please try again later.',
          );
        }
      } else {
        if (responseData.error) {
          showAlert(responseData.error);
        } else {
          showAlert(
            'Oops, an Error',
            'An error occurred. Please try again later.',
          );
        }
      }
    } catch (error) {
      showAlert('Oops, an Error', 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/icon/logo.png')}
            style={styles.logoSize}
          />
          <Text style={styles.register}>Register your account</Text>
        </View>
        <View style={styles.contactUsForm}>
          <View style={{marginTop: 9}} />
          <TextInput
            placeholder="First Name *"
            style={styles.input}
            selectionColor="#183153"
            value={firstName}
            onChangeText={handleFirstName}
          />

          <TextInput
            placeholder="Last name *"
            style={styles.input}
            selectionColor="#183153"
            value={lastName}
            onChangeText={handleLastName}
          />
          <TextInput
            placeholder="Contact Number *"
            keyboardType="numeric"
            style={styles.input}
            selectionColor="#183153"
            value={contactNumber}
            onChangeText={handleContactName}
          />
          <TextInput
            placeholder="E-mail *"
            style={styles.input}
            selectionColor="#183153"
            value={email}
            onChangeText={handleSetEmail}
          />
          <TextInput
            placeholder="Enter your password *"
            style={styles.input}
            selectionColor="#183153"
            value={password}
            onChangeText={handlePassword}
          />
          <View style={styles.styleRegisterBtn}>
            <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
              <Text style={styles.sendMessage}>
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.styleLoginBtn}>
            <Text style={styles.loginText}>I have already an account </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginStack')}>
              <Text style={styles.signInBtn}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#183153',
    color: '#007036',
    padding: 10,
  },
  textMessage: {
    margin: 1,
  },

  register: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 10,
    color: '#FFF',
  },

  contactUsForm: {
    borderWidth: 1,
    borderColor: '#E9EBEC',
    borderRadius: 10,
    padding: 5,
  },
  input: {
    height: 45,
    margin: 8,
    padding: 10,
    borderRadius: 5,
    borderColor: '#E9EBEC',
    backgroundColor: '#E9EBEC',
  },

  styleRegisterBtn: {
    borderRadius: 10,
    padding: 10,
  },
  sendMessage: {
    padding: 10,
    backgroundColor: '#E9EBEC',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#E9EBEC',
    color: '#000',
    overflow: 'hidden',
  },

  styleLoginBtn: {
    margin: 20,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  signInBtn: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#E9EBEC',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#E9EBEC',
    color: '#000',
    overflow: 'hidden',
    width: 100,
    alignSelf: 'center',
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSize: {
    width: 200,
    height: 200,
  },
});

export default SignupScreen;
