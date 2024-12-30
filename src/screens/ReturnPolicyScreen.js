import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

// Api Call
import {getReturnPolicyData} from '../api/About/returnPolicy';
import Loader from '../components/Loader/loader';

const ReturnPolicyScreen = () => {
  const [loading, setLoading] = useState(true);
  const [returnPolicy, setReturnPolicy] = useState({});
  const {width} = useWindowDimensions();

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    sleep();

    getReturnPolicyData().then(data => {
      setReturnPolicy(data);
      setLoading(false);
    });
  }, []);

  const source = {
    html: `${returnPolicy?.description}`,
  };

  if (returnPolicy) {
    return (
      <SafeAreaView style={styles.returnPolicyContainer}>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.returnPolicy}>
            <Text style={styles.returnPolicyTitle}>
              Returns, Refunds and Exchange
            </Text>
            <ScrollView>
              <View style={styles.returnPolicyMargin}>
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
  returnPolicyContainer: {
    flex: 1,
  },
  returnPolicy: {
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
  returnPolicyMargin: {
    margin: 15,
  },
  returnPolicyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    overflow: 'hidden',
    color: '#000',
  },
  returnPolicySubTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 20,
  },
  returnPolicyText: {
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

export default ReturnPolicyScreen;
