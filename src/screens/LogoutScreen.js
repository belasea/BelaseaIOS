import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = async () => {
    try {
      // Remove AsyncStorage token here
      await AsyncStorage.removeItem('token');
      // console.log('Token removed from AsyncStorage');

      // Navigate to the login screen
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginStack'}],
      });
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.logout}>
            <Text style={styles.logoutTitle}>
              <Octicons
                name="sign-in"
                size={20}
                style={{color: 'white'}}
                color="black"
              />{' '}
              Logout Account
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to logout your account?
              </Text>
              <View style={styles.modalButtons}>
                <Button title="Yes" onPress={handleLogout} color="red" />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="blue"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutContent: {
    margin: 1,
  },

  logout: {
    backgroundColor: '#183153',
    color: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    fontSize: 12,
    padding: 5,
    justifyContent: 'center',
  },

  logoutTitle: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  deleteTitle: {
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 3,
  },
  onPressBtn: {
    padding: 10,
  },
  deleteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
