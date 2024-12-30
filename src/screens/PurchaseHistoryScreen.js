import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import PurchaseOrder from '../components/TrackingMyParcel/PurchaseOrder';
import Loader from '../components/Loader/loader';

const PurchaseHistoryScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.trackingParcelWrap}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.trackingParcel}>
          <ScrollView>
            <PurchaseOrder navigation={navigation} />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trackingParcelWrap: {
    flex: 1,
  },
  trackingParcel: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
  trackingParcelForm: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  sectionSearch: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1b3c60',
        height: 40,
        borderRadius: 15,
        margin: 10,
        textAlign: 'center',
        overflow: 'hidden',
      },
      android: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#1b3c60',
        height: 40,
        borderRadius: 15,
        overflow: 'hidden',
        margin: 10,
        textAlign: 'center',
      },
    }),
  },
  searchStyleInput: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginLeft: 10,
    textAlign: 'center',
  },
  searchIcon: {
    backgroundColor: '#1b3c60',
    color: '#FFF',
    padding: 10,
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default PurchaseHistoryScreen;
