import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

// Api Call
import {getSecurityPrivacyData} from '../api/About/securityPrivacy';
import Loader from '../components/Loader/loader';

const SecurityPrivacyScreens = () => {
  const [securityPrivacy, setSecurityPrivacy] = useState({});
  const [loading, setLoading] = useState(true);
  const {width} = useWindowDimensions();

  const source = {
    html: `<p style="line-height: 30px; text-align: justify">${securityPrivacy?.description}</p>`,
  };

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    sleep();

    getSecurityPrivacyData().then(data => {
      setSecurityPrivacy(data);
      setLoading(false);
    });
  }, []);

  if (securityPrivacy) {
    return (
      <SafeAreaView style={styles.securityPrivacyContainer}>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.securityPrivacy}>
            <ScrollView>
              <View style={styles.securityPrivacyMargin}>
                <RenderHtml contentWidth={width} source={source} />
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.noDataContainer}>
        <Text style={styles.noDataTitle}>No Data Found</Text>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  securityPrivacyContainer: {
    flex: 1,
  },
  securityPrivacy: {
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
  securityPrivacyMargin: {
    margin: 15,
  },
  securityPrivacyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    overflow: 'hidden',
  },
  securityPrivacySubTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 20,
  },
  securityPrivacyText: {
    textAlign: 'justify',
    lineHeight: 24,
    marginBottom: 10,
  },

  noDataContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataTitle: {
    fontWeight: 'bold',
  },
});
export default SecurityPrivacyScreens;
