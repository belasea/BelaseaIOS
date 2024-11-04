import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Icons
import Loader from '../components/Loader/loader';
const ForgotPasswordScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    sleep();
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.forgotPasswordTitle}>Forgot Your Password</Text>
            <Text style={styles.forgotPasswordSubTitle}>
              Please enter your email address you'd like your password reset
              information sent to
            </Text>
          </View>
          <View style={styles.mainForm}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              placeholderTextColor="#000"
              selectionColor="#000"
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('LoginStack')}>
            <Text style={styles.signInBtn}>Request Reset Link</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
  forgotPasswordTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 7,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  forgotPasswordSubTitle: {
    color: 'black',
    fontSize: 16,
    justifyContent: 'center',
    lineHeight: 23,
    padding: 5,
  },

  mainForm: {
    padding: 5,
  },

  input: {
    height: 50,
    margin: 8,
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    color: '#000',
    fontSize: 15,
    minWidth: 300,
  },
  signInBtn: {
    marginTop: 10,
    padding: 13,
    backgroundColor: '#183153',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#183153',
    color: '#FFFFFF',
    overflow: 'hidden',
    alignSelf: 'center',
    minWidth: 300,
    fontSize: 15,
  },
});
export default ForgotPasswordScreen;
