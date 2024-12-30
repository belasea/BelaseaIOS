import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Loader from '../components/Loader/loader';
import Giveaway from '../components/Giveaway/Giveaway';
import {BASE_URL} from '../api/api';

const GiveawayScreen = () => {
  const [loading, setLoading] = useState(true);
  const [liveOffer, setLiveOffer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`${BASE_URL}/api/live-offer/`);
      const data = await resp.json();
      setLiveOffer(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (liveOffer) {
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.safeArea}>
          {loading ? (
            <Loader />
          ) : (
            liveOffer?.data.map((offer, index) => (
              <Giveaway offer={offer} key={index} />
            ))
          )}
        </View>
      </ScrollView>
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
  mainContent: {
    overflow: 'hidden',
  },
  safeArea: {
    color: '#000',
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
  },

  liveOfferContent: {
    marginBottom: 10,
    padding: 10,
  },
  liveOfferImage: {
    width: 340,
    height: 250,
    borderRadius: 10,
  },
  liveOfferTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  liveOfferSubTitle: {
    marginBottom: 6,
  },
  liveOfferLike: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
  },
  liveOfferLikeLeft: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  liveOfferIcon: {
    marginRight: 20,
  },
  liveOfferLikeRight: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  liveOfferInputBox: {
    padding: 10,
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray',
  },
  liveOfferShowComment: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  liveOfferSaveComment: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  liveOfferCommentButton: {
    marginTop: 5,
    padding: 6,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#A88342',
    marginRight: 5,
  },
  noDataTitle: {
    color: '#000',
  },
});
export default GiveawayScreen;
