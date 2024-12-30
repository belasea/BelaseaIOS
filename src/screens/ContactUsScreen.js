import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

// Api Call
import {BASE_URL} from '../api/api';

const ContactUsScreen = () => {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/contact-address/`);
      const data = await response.json();

      if (data.status) {
        setContactInfo(data.result);
      } else {
        console.warn(data.message);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // submit data on contact list
  const onClickFormHandler = () => {
    const data = {subject, name, phone, email, message};
    setPending(true);

    fetch(`${BASE_URL}/api/contact-us/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(responseData => {
        if (responseData.status) {
          setSubject('');
          setName('');
          setPhone('');
          setEmail('');
          setMessage('');
          setSuccessMessage('Thank you for your message.');
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        } else {
          console.warn('Failed to send message:', responseData.message);
        }
        setPending(false);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setPending(false);
      });
  };

  return (
    <SafeAreaView style={styles.contactUsContainer}>
      <ScrollView>
        <View style={styles.contactUsForm}>
          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
          ) : null}

          <TextInput
            placeholder="Subject *"
            style={styles.input}
            value={subject}
            selectionColor="#000"
            placeholderTextColor="#000"
            onChangeText={setSubject}
          />
          <TextInput
            placeholder="Full Name *"
            style={styles.input}
            value={name}
            selectionColor="#000"
            placeholderTextColor="#000"
            onChangeText={setName}
          />
          <TextInput
            placeholder="E-mail *"
            style={styles.input}
            value={email}
            selectionColor="#000"
            placeholderTextColor="#000"
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Phone *"
            style={styles.input}
            value={phone}
            keyboardType="numeric"
            selectionColor="#000"
            placeholderTextColor="#000"
            onChangeText={setPhone}
          />
          <TextInput
            placeholder="Write your message *"
            multiline
            style={styles.textArea}
            value={message}
            selectionColor="#000"
            placeholderTextColor="#000"
            onChangeText={setMessage}
          />
          <View style={styles.styleLoginBtn}>
            <TouchableOpacity onPress={onClickFormHandler} disabled={isPending}>
              <Text style={styles.sendMessage}>
                {isPending ? 'Data Sending ...' : 'Send Message'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainAddressWrap}>
          {/* Contact Address */}
          {isLoading ? (
            <Text style={styles.loadingInformation}>
              Loading contact information...
            </Text>
          ) : contactInfo ? (
            <View style={styles.contactUsAddress}>
              <Text style={styles.contactUsAddressTitle}>Address</Text>
              <View style={styles.addressDetail}>
                <Text style={styles.contactInfo}>{contactInfo.address1}</Text>
                <Text style={styles.contactInfo}>{contactInfo.address2}</Text>
                <Text style={styles.contactInfo}>{contactInfo.address3}</Text>
              </View>
              <Text style={styles.contactUsAddressPhone}>Phone</Text>
              <View style={styles.contactUsAddressPhoneList}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${contactInfo.phone}`)}>
                  <Text style={styles.contactInfo}>{contactInfo.phone}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.contactUsAddressEmail}>E-mail</Text>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`mailto:${contactInfo.email}`)
                  }>
                  <Text style={styles.contactInfo}>{contactInfo.email}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.noContent}>
              No contact information available.
            </Text>
          )}
          {/* Contact Google Map */}
          {contactInfo?.image && (
            <View style={styles.map}>
              <Image
                source={{uri: contactInfo.image}}
                style={styles.mapImage}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contactUsContainer: {
    flex: 1,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  contactUsForm: {
    margin: 2,
  },
  input: {
    height: 50,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#000',
    color: '#000',
  },
  textArea: {
    height: 60,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#000',
    color: '#000',
  },
  styleLoginBtn: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendMessage: {
    padding: 7,
    backgroundColor: '#183153',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    color: '#FFF',
  },

  noContent: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  loadingInformation: {
    color: '#000',
  },

  mainAddressWrap: {
    marginTop: 5,
  },
  contactUsAddress: {
    flex: 1,
    margin: 15,
  },
  contactUsAddressTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
  },
  addressDetail: {
    margin: 10,
    color: '#000',
  },
  contactInfo: {
    color: '#000',
  },
  contactUsAddressPhone: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
  },
  contactUsAddressPhoneList: {
    margin: 10,
  },
  contactUsAddressEmail: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default ContactUsScreen;
