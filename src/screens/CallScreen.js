import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../components/Loader/loader';

import {BASE_URL} from '../api/api';

const CallScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch phone number and message from the API
    const fetchCallInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/call`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.status) {
          setPhoneNumber(data.result);
          setMessage(data.message);
        } else {
          setPhoneNumber('');
          setMessage('Failed to retrieve the phone number.');
        }
      } catch (error) {
        console.error('Error fetching call info:', error);
        setPhoneNumber('');
        setMessage('Error fetching call info.');
      } finally {
        setLoading(false);
      }
    };

    fetchCallInfo();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.callIcon}>
            <Feather name="phone-call" size={100} color="black" />
          </View>
          <Text
            style={styles.call}
            onPress={() => {
              if (phoneNumber) {
                Linking.openURL(`tel:${phoneNumber}`); // No '+' needed before the number
              }
            }}>
            Click to Call
          </Text>
          <View style={styles.callText}>
            <Text style={styles.textMessage}>{message}</Text>
          </View>
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
    backgroundColor: '#f8f8f8',
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
  call: {
    marginTop: 10,
    padding: 7,
    backgroundColor: '#183153',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    width: 150,
    color: '#FFF',
  },
  callText: {
    marginTop: 30,
    marginLeft: 4,
    marginRight: 4,
  },
  callIcon: {
    padding: 10,
    borderRadius: 10,
  },
  textMessage: {
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CallScreen;
