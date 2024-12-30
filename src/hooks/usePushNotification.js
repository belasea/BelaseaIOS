// usePushNotification.js
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {BASE_URL} from '../api/api';

const usePushNotification = () => {
  // Showing pop up message ==================================================
  async function DisplayNotification(remoteMessage) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    });
  }

  // User give permission ====================================================
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  // Collect user token ==========================================================
  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log('Your Firebase Token is:', fcmToken);
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          device_token: fcmToken,
        }),
      };
      fetch(`${BASE_URL}/account/api/send-device-token/`, requestOptions);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  // ForegroundNotifications ========================================================
  const listenToForegroundNotifications = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      DisplayNotification(remoteMessage);
    });
    return unsubscribe;
  };

  // BackgroundNotifications ===========================================================
  const listenToBackgroundNotifications = () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        DisplayNotification(remoteMessage);
      },
    );
    return unsubscribe;
  };

  // onNotificationOpenedAppFromBackground =============================================
  const onNotificationOpenedAppFromBackground = () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        DisplayNotification(remoteMessage);
      },
    );
    return unsubscribe;
  };

  // onNotificationOpenedAppFromQuit =================================================
  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();
    if (message) {
      DisplayNotification(message);
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
