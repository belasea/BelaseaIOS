import React, {useState, useContext} from 'react';
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
import {AuthContext} from '../contexts/AuthContext';
// import useGoogleSignIn from '../hooks/useGoogleSignIn';

const SettingScreen = ({navigation}) => {
  const {setIsAuthenticated, setUser} = useContext(AuthContext);
  // const {signOut} = useGoogleSignIn();

  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = async () => {
    try {
      setIsAuthenticated(false);
      setUser({});
      await AsyncStorage.removeItem('token');
      // await signOut();
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
              <Octicons name="sign-in" size={20} color="black" /> Logout Account
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
                <Button title="Yes" onPress={handleLogout} color="#E85467" />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="#000"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutContent: {
    margin: 1,
  },

  logout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    borderWidth: 2,
    borderColor: '#183153',
    padding: 10,
    borderRadius: 10,
    minWidth: 150,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutTitle: {
    fontWeight: 'bold',
    color: 'black',
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
