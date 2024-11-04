// App.js

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {CartProvider} from './src/contexts/CartContext';
import {AuthProvider} from './src/contexts/AuthContext';
import usePushNotification from './src/hooks/usePushNotification';

const navigationRef = React.createRef();
const nav = () => navigationRef.current;

const App = () => {
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = async () => {
      try {
        await requestUserPermission();
        await getFCMToken();
        onNotificationOpenedAppFromQuit();

        // Only register listeners once
        const unsubscribeForeground = listenToForegroundNotifications();
        const unsubscribeBackground = listenToBackgroundNotifications();
        onNotificationOpenedAppFromBackground();

        return () => {
          // Cleanup by removing listeners when the component unmounts
          unsubscribeForeground();
          unsubscribeBackground();
        };
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, [
    requestUserPermission,
    getFCMToken,
    onNotificationOpenedAppFromQuit,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
  ]);

  const logScreenView = async () => {
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    await analytics().logScreenView({
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#183153" barStyle="light-content" />
        <AuthProvider>
          <CartProvider>
            <NavigationContainer
              ref={navigationRef}
              onReady={logScreenView}
              onStateChange={logScreenView}>
              <DrawerNavigator nav={nav} />
            </NavigationContainer>
          </CartProvider>
        </AuthProvider>
      </SafeAreaView>
      <View style={styles.statusBarFooter} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#183153',
    color: '#FFF',
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
});

export default App;
