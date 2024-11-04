/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';

// components
import CategoryByMakeup from '../components/Category/CategoryByMakeup';
import CategoryBySkin from '../components/Category/CategoryBySkin';
import CategoryByConcern from '../components/Category/CategoryByConcern';

// Api Call
import {getMakeupData} from '../api/Category/makeup';
import {getSkinData} from '../api/Category/skin';
import {getConcernData} from '../api/Category/concern';

import Loader from '../components/Loader/loader';
// import {AuthContext} from '../contexts/AuthContext';

const CategoryScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [byMakeup, setByMakeup] = useState([]);
  const [bySkin, setBySkin] = useState([]);
  const [byConcern, setByConcern] = useState([]);

  //   const {isAuthenticate} = useContext(AuthContext);

  //   useEffect(() => {
  //     if (!isAuthenticate) {
  //       navigation.navigate('WelcomeStack');
  //     }
  //   }, []);

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    sleep();

    getMakeupData().then(data => {
      setByMakeup(data);
      setLoading(false);
    });

    getSkinData().then(data => {
      setBySkin(data);
      setLoading(false);
    });

    getConcernData().then(data => {
      setByConcern(data);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            {/* Category By Makeup */}
            <View style={styles.byMakeup}>
              <CategoryByMakeup byMakeup={byMakeup} navigation={navigation} />
            </View>

            {/* Category By Skin */}
            <View style={styles.bySkin}>
              <CategoryBySkin bySkin={bySkin} navigation={navigation} />
            </View>

            {/* Category By Concern */}
            <View style={styles.byConcern}>
              <CategoryByConcern
                byConcern={byConcern}
                navigation={navigation}
              />
            </View>
          </ScrollView>
        </View>
      )}
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
  byMakeup: {
    overflow: 'hidden',
    padding: 1,
    marginTop: 10,
  },

  bySkin: {
    overflow: 'hidden',
    marginTop: 10,
  },
  byConcern: {
    overflow: 'hidden',
    padding: 4,
    marginTop: 10,
  },
});

export default CategoryScreen;
