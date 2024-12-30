import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import RenderHtml from 'react-native-render-html';
import Loader from '../components/Loader/loader';

// Api Call
import {getAboutData} from '../api/About/aboutUs';

const AboutUsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState({});
  const {width} = useWindowDimensions();

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    sleep();

    getAboutData().then(data => {
      setAbout(data);
      setLoading(false);
    });
  }, []);

  const source = {
    html: `<p>${about?.description}</p>`,
  };

  if (about) {
    return (
      <SafeAreaView style={styles.aboutUsContainer}>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.aboutUs}>
            <ScrollView>
              <View style={styles.aboutUsMargin}>
                <RenderHtml
                  contentWidth={width}
                  source={source}
                  defaultTextProps={{style: {color: '#000000', lineHeight: 25}}}
                />
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
  aboutUsContainer: {
    flex: 1,
  },
  aboutUs: {
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
  aboutUsMargin: {
    margin: 15,
  },
  aboutUsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    overflow: 'hidden',
  },
  aboutUsText: {
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

export default AboutUsScreen;
