// useGoogleSignIn.js
import {useEffect, useContext} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {BASE_URL} from '../api/api';
import {AuthContext} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const useGoogleSignIn = () => {
  const navigation = useNavigation();
  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '56184510177-k55adkhjec6agl6rcbkcumugiv8pefor.apps.googleusercontent.com',
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
        'profile',
        'email',
      ],
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      navigation.navigate('HomeStack');
      await sendUserDataToBackend(userInfo.user);
    } catch (error) {
      handleSignInError(error);
    }
  };

  const sendUserDataToBackend = async userData => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: userData}),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/account/api/send-gmail-login/`,
        requestOptions,
      );
      if (!response.ok) {
        console.error('Failed to send user data', response.statusText);
      }
    } catch (error) {
      console.error('Error sending user data:', error);
    }
  };

  const handleSignInError = error => {
    console.log('Message', error.message);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play Services Not Available or Outdated');
    } else {
      console.log('Some Other Error Happened');
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error('signOut Error', error);
    }
  };

  return {signIn, signOut};
};

export default useGoogleSignIn;
