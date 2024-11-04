import React, {useState, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../contexts/AuthContext';
import {BASE_URL} from '../api/api';

const OTPScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState(route.params.phone);
  const [loader, setLoader] = useState(false);

  const {setUser, isAuthenticate, user, setIsAuthenticate} =
    useContext(AuthContext);

  const clearInput = useCallback(() => setOtp(''), []);

  const storeData = async token => {
    try {
      const jsonUserValue = JSON.stringify(user);
      await AsyncStorage.setItem('@store_token_key', token);
      await AsyncStorage.setItem('@store_user', jsonUserValue);
    } catch (e) {
      console.log('e', e);
    }
  };

  const verifyBtnHandle = () => {
    if (otp === '') {
      ShowErrorAlert('Please provide the given OTP number.');
    }

    if (otp) {
      setLoader(true);
      const data = {
        contact_number: route.params.phone,
        otp: otp,
      };

      fetch(`${BASE_URL}/account/api/match-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setLoader(false);
          if (!data.status) {
            ShowErrorAlert(data.msg);
          } else {
            setLoader(false);
            clearInput();
            setUser(data.user_data);
            setIsAuthenticate(true);
            navigation.navigate('HomeStack');
            storeData(data.token).then(() => {
              console.log('data stored');
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setLoader(false);
          ShowErrorAlert('Please try again !!');
        });
    }
  };

  const sendOtpToUser = async () => {
    if (phone === '') {
      ShowErrorAlert('Please give a phone number !!');
    }

    if (phone) {
      setLoader(true);
      const data = {contact_number: phone};

      fetch(`${BASE_URL}/account/api/send-otp-to-user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setLoader(false);
          if (!data.status) {
            ShowErrorAlert(data.Message);
          } else {
            clearInput();
            ShowErrorAlert('New otp is send to your given mobile number.');
          }
        })
        .catch(error => {
          setLoader(false);
          ShowErrorAlert('Please try again !!');
        });
    }
  };

  const ShowErrorAlert = message => {
    Alert.alert('', `${message}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => console.log('Ok Pressed'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.btnWrap}>
            <Text style={styles.sendMessage}>
              We have sent you an sms with a code to {route.params.phone}.
            </Text>
            <Text style={styles.activation}>
              To complete your phone number verification please enter the
              4-digit activation code
            </Text>
          </View>
          <View style={styles.optMessageBoxContent}>
            <TextInput
              selectionColor="#183153"
              keyboardType="numeric"
              value={otp}
              style={styles.optMessageBox}
              maxLength={4}
              onChangeText={setOtp}
            />
          </View>
          <Text style={styles.expire}>Your code will expire in 6 hours</Text>
          <Text style={styles.resendMessage}>Didn't receive a Code ?</Text>

          <View style={styles.resendOrEdit}>
            <View style={{textAlign: 'center'}}>
              <TouchableOpacity style={{padding: 7}} onPress={sendOtpToUser}>
                <Text style={{color: '#ef4444', fontWeight: 'bold'}}>
                  RESEND
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{textAlign: 'center', marginLeft: 8, marginRight: 8}}>
              <TouchableOpacity style={{padding: 7}}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>or</Text>
              </TouchableOpacity>
            </View>
            <View style={{textAlign: 'center'}}>
              <TouchableOpacity
                style={{padding: 7}}
                onPress={() => navigation.navigate('WelcomeStack')}>
                <Text style={{color: '#ef4444', fontWeight: 'bold'}}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View pointerEvents={loader ? 'none' : 'auto'}>
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={verifyBtnHandle}>
              <Text style={styles.verifyContinue}>
                {loader ? 'Loading...' : 'VERIFY & CONTINUE'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#183153',
    color: '#FFF',
  },
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrap: {
    overflow: 'hidden',
    margin: 5,
  },
  sendMessage: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  activation: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },

  optMessageBoxContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -3,
  },
  optMessageBox: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: 'gray',
    width: 150,
  },
  expire: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  resendMessage: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  resendOrEdit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  verifyBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifyContinue: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default OTPScreen;
