import React, {useContext} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {CartProvider} from './src/contexts/CartContext';
import {NetworkProvider, NetworkContext} from './src/contexts/NetworkContext';

const navigationRef = React.createRef();
const nav = () => navigationRef.current;

const App = () => {
  return (
    <NetworkProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#183153" barStyle="light-content" />
        <NetworkStatusHandler />
        <View style={styles.statusBarFooter} />
      </SafeAreaView>
    </NetworkProvider>
  );
};

const NetworkStatusHandler = ({logScreenView}) => {
  const {isInternet} = useContext(NetworkContext);

  return isInternet ? (
    <CartProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={logScreenView}
        onStateChange={logScreenView}>
        <DrawerNavigator nav={nav} />
      </NavigationContainer>
    </CartProvider>
  ) : (
    <View style={styles.offlineContainer}>
      <Text style={styles.wifiLogo}>
        <MaterialIcons name="wifi-off" color={'black'} size={100} />
      </Text>
      <Text style={styles.offlineText}>No Internet connection</Text>
      <Text style={styles.backOnline}>Try these steps to get back online:</Text>

      <View style={styles.checkItem}>
        <MaterialIcons name="check-circle" color={'black'} size={15} />
        <Text style={styles.checkItemText}>Check your modem and router</Text>
      </View>

      <View style={styles.checkItem}>
        <MaterialIcons name="check-circle" color={'black'} size={15} />
        <Text style={styles.checkItemText}>Reconnect to Wi-Fi</Text>
      </View>

      <TouchableOpacity style={styles.reloadButton}>
        <Text style={styles.reloadButtonText}>Reload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  statusBarFooter: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        flex: 0.1,
        marginBottom: -40,
      },
      android: {
        marginBottom: 0,
        flex: 0,
        backgroundColor: '#fff',
      },
    }),
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wifiLogo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  offlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'center',
  },
  backOnline: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    alignSelf: 'center',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkItemText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  reloadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
