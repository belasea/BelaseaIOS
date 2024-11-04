import React, {useState, useCallback, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {BASE_URL} from '../api/api';
import {AuthContext} from '../contexts/AuthContext';
import Loader from '../components/Loader/loader';
// import * as Network from "expo-network";

const WelcomeScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [generateOtpLoading, setGenerateOtpLoading] = useState(false);
  const {mainLoader} = useContext(AuthContext);
  const clearInput = useCallback(() => setPhone(''), []);

  // async function checkNetworkConnection() {
  //     const network = await Network.getNetworkStateAsync();
  //     if (!network.isConnected) {
  //         showNetWorkErrorAlert()
  //     } else {
  //         console.log("Network is connected !!")
  //     }
  // }

  // const showNetWorkErrorAlert = () => {
  //     Alert.alert(
  //         "",
  //         "No Internet connection, please connect to Wi-Fi networks on your Android device",
  //         [
  //             {
  //                 text: "Cancel",
  //                 onPress: () => null,
  //                 style: "cancel"
  //             },
  //             {
  //                 text: "Ok",
  //                 onPress: () => null
  //             }
  //         ]
  //     );
  // };

  // useEffect(() => {
  //     checkNetworkConnection()
  // }, []);

  const sendOtpToUser = async () => {
    if (phone === '') {
      ShowErrorAlert('Please give a phone number !!');
    }

    if (phone) {
      setGenerateOtpLoading(true);
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
          setGenerateOtpLoading(false);
          if (!data.status) {
            ShowErrorAlert(data.msg);
          } else {
            clearInput();
            navigation.navigate('OTPStack', {
              screen: 'OTP',
              params: {phone: data.data.contract_number},
            });
          }
        })
        .catch(error => {
          setGenerateOtpLoading(false);
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
      {mainLoader ? (
        <Loader />
      ) : (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.belaLogo}>
            <Image
              source={require('../assets/loginLogo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to Belasea</Text>
            <Text style={styles.sendSMSText}>
              Belasea will send an sms message to verify you phone number
            </Text>
            <TextInput
              placeholder="Enter your phone number (01xxxxxxxxx)"
              placeholderTextColor="#7C7C7C"
              style={styles.welcomeInput}
              selectionColor="#183153"
              keyboardType="numeric"
              onChangeText={setPhone}
              value={phone}
            />

            <View style={styles.styleLoginBtn}>
              <View pointerEvents={generateOtpLoading ? 'none' : 'auto'}>
                <TouchableOpacity onPress={sendOtpToUser}>
                  <Text style={styles.submitBtn}>
                    {generateOtpLoading ? 'Loading....' : 'GENERATE CODE'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  noInternet: {
    flex: 1,
  },
  noInternetContent: {
    flex: 1,
    backgroundColor: '#183153',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noConnectionTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },

  reloadButton: {
    marginTop: 10,
    padding: 7,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#A88342',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#183153',
  },
  belaLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 80,
    marginBottom: 27,
  },
  welcomeContainer: {
    overflow: 'hidden',
    margin: 10,
  },
  welcomeInput: {
    height: 45,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: '#FFF',
    color: '#0C0C0C',
  },
  sendSMSText: {
    color: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  welcomeText: {
    color: '#fff',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  styleLoginBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    padding: 7,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
