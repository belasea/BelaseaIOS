/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import Loader from '../components/Loader/loader';
import Makeup from '../components/Home/MakeUp';
import Slider from '../components/Home/Slider';
import ByConcern from '../components/Home/ByConcern';
import BySkin from '../components/Home/BySkin';
import HotDeals from '../components/Home/HotDeals';
import {getMakeupData} from '../api/Home/byMakeup';
import {getSkinData} from '../api/Home/bySkin';
import {getConcernData} from '../api/Home/byConcern';
import {getHotDealsProductsOfferList} from '../api/HotDeals/hotDeals';

const HomeScreen = ({navigation}) => {
  const [byMakeup, setByMakeup] = useState([]);
  const [bySkin, setBySkin] = useState([]);
  const [byConcern, setByConcern] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const showAppUpdateAlert = () => {
    Alert.alert(
      '',
      'A new version of the app is available. Please update to continue.',
      [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {
          text: 'Update',
          onPress: () =>
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.mohinur.shop',
            ),
        },
      ],
    );
  };

  useEffect(() => {
    const checkAppVersion = async () => {
      try {
        const latestVersion = await checkVersion({
          version: DeviceInfo.getVersion(),
          androidStoreURL:
            'https://play.google.com/store/apps/details?id=com.mohinur.shop',
          country: 'jp', // Adjust the country code as needed
        });

        if (latestVersion.result === 'new') {
          showAppUpdateAlert();
        }
      } catch (error) {
        console.log('Version check error:', error);
      }
    };

    checkAppVersion();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [makeupData, skinData, concernData, hotDealsData] =
          await Promise.all([
            getMakeupData(),
            getSkinData(),
            getConcernData(),
            getHotDealsProductsOfferList(),
          ]);

        setByMakeup(makeupData);
        setBySkin(skinData);
        setByConcern(concernData);
        setHotDeals(hotDealsData);
      } catch (error) {
        console.error('Data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView>
            <Slider navigation={navigation} />
            <View style={styles.hotDeals}>
              <Text style={styles.hotDealsTitle}>Hot Deals</Text>
              <HotDeals hotDeals={hotDeals} navigation={navigation} />
            </View>
            <View style={styles.byMakeup}>
              <Text style={styles.byMakeupTitle}>By Makeup</Text>
              <Makeup byMakeup={byMakeup} navigation={navigation} />
            </View>
            <View style={styles.bySkin}>
              <Text style={styles.bySkinTitle}>By Skin</Text>
              <BySkin bySkin={bySkin} navigation={navigation} />
            </View>
            <View style={styles.byConcern}>
              <Text style={styles.byConcernTitle}>By Concern</Text>
              <ByConcern byConcern={byConcern} navigation={navigation} />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
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
  hotDeals: {
    overflow: 'hidden',
    padding: 3,
    marginTop: 10,
  },
  hotDealsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  byMakeup: {
    overflow: 'hidden',
    padding: 1,
    marginTop: 10,
  },
  byMakeupTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  bySkin: {
    overflow: 'hidden',
    marginTop: 10,
  },
  bySkinTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  byConcern: {
    overflow: 'hidden',
    padding: 4,
    marginTop: 10,
  },
  byConcernTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default HomeScreen;
