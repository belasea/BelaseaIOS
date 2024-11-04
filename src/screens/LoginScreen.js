import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../contexts/AuthContext';
import {BASE_URL} from '../api/api';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import useGoogleSignIn from '../hooks/useGoogleSignIn';

const LoginScreen = ({navigation}) => {
  const {signIn, signOut} = useGoogleSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, setIsAuthenticated} = useContext(AuthContext);

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/account/api/sign-in/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const {token, ...userData} = data;
        await AsyncStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
        navigation.navigate('HomeStack');
      } else {
        Alert.alert(
          'Login Failed',
          'Your email and password do not match. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1}} />
      <ScrollView>
        <View style={styles.logoSection}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
            <Image
              source={require('../assets/icon/logo.png')}
              style={styles.logoSize}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mainForm}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#FFF"
            selectionColor="#FFF"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#FFF"
            selectionColor="#FFF"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.forgetPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordStack')}>
            <Text style={styles.forgetPasswordBtn}>Forget password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerBtn}>
          <TouchableOpacity onPress={handleLogin} disabled={isSubmitting}>
            <Text style={styles.sendMessage}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialLogin}>
          <View style={styles.socialLoginMessage}>
            <Text style={styles.socialLoginMessageStyle} />
            <Text style={styles.orText}>Or Login With</Text>
            <Text style={styles.socialLoginMessageStyle} />
          </View>
        </View>
        <View style={styles.socialBtnWrap}>
          <View style={[styles.socialBtn, styles.firstSocialBtn]}>
            <View style={styles.registerBtn}>
              <TouchableOpacity>
                <GoogleSigninButton
                  style={{maxWidth: 200, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={signIn}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.noAccount}>
          <Text style={styles.loginText}>Don't have an account yet ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupStack')}>
            <Text style={styles.signInBtn}>Sign Up</Text>
          </TouchableOpacity>
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
    color: '#FFF',
    padding: 10,
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSize: {
    width: 200,
    height: 200,
  },

  mainForm: {
    padding: 5,
  },

  input: {
    height: 50,
    margin: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E9EBEC',
    color: '#E9EBEC',
    fontSize: 15,
  },
  forgetPassword: {
    flex: 1,
  },
  forgetPasswordBtn: {
    color: '#FFF',
    paddingRight: 15,
    textAlign: 'right',
  },

  registerBtn: {
    borderRadius: 10,
    paddingTop: 20,
    padding: 10,
  },

  socialLogin: {
    marginTop: 40,
  },
  socialLoginMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLoginMessageStyle: {
    borderBottomWidth: 1,
    paddingLeft: 30,
    paddingRight: 30,
    width: 140,
    borderColor: '#f3f3f3',
  },

  orText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  socialBtnWrap: {
    flexDirection: 'row',
  },

  socialBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  firstSocialBtn: {
    marginRight: 10, // Adjust the value as needed
  },

  sendMessageBtn: {
    padding: 10,
    backgroundColor: '#FFF',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
    fontSize: 16,
    width: 180,
    margin: 5,
  },

  sendMessage: {
    padding: 10,
    backgroundColor: '#FFF',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
    fontSize: 16,
  },

  // socialBtnWrap: {
  //   flexDirection: 'row',
  // },

  // socialBtn: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // sendMessageBtn: {
  //   padding: 10,
  //   backgroundColor: '#FFF',
  //   textAlign: 'center',
  //   borderRadius: 8,
  //   fontWeight: 'bold',
  //   borderColor: '#FFF',
  //   color: '#000',
  //   overflow: 'hidden',
  //   fontSize: 16,
  //   width: 180,
  // },

  // sendMessage: {
  //   padding: 10,
  //   backgroundColor: '#FFF',
  //   textAlign: 'center',
  //   borderRadius: 8,
  //   fontWeight: 'bold',
  //   borderColor: '#FFF',
  //   color: '#000',
  //   overflow: 'hidden',
  //   fontSize: 16,
  // },

  noAccount: {
    marginTop: 20,
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
    backgroundColor: '#FFF',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#FFF',
    color: '#000',
    overflow: 'hidden',
    width: 100,
    alignSelf: 'center',
  },
});

export default LoginScreen;
