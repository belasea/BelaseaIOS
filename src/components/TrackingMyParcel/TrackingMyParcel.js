/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getTrackingMyParcelListData} from '../../api/TrackingMyParcel/trackingMyParcel';
import Loader from '../Loader/loader';

const TrackingMyParcel = ({navigation}) => {
  const [trackList, setTrackList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrackingList = async () => {
    if (loading || !hasMore) {
      return; // Prevent multiple requests
    }

    setLoading(true);
    try {
      const data = await getTrackingMyParcelListData(searchQuery, page);
      if (data?.results?.data.length === 0) {
        setHasMore(false); // No more data available
      } else {
        setTrackList(prevTrackList => [...prevTrackList, ...data.results.data]); // Append new data
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setTrackList([]); // Reset track list when search query changes
      setPage(1); // Reset page when search query changes
      setHasMore(true); // Reset hasMore when search query changes
      getTrackingList();
    }
  }, [searchQuery]); // Fetch when the search query changes

  useEffect(() => {
    getTrackingList();
  }, [page]); // Fetch when the page changes

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSearchQuery('');
      setTrackList([]);
      setPage(1);
      setHasMore(true);
    });
    return unsubscribe;
  }, [navigation]);

  const handleScroll = event => {
    const bottom =
      event.nativeEvent.contentOffset.y +
        event.nativeEvent.layoutMeasurement.height >=
      event.nativeEvent.contentSize.height - 20;
    if (bottom && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.trackingParcelContainer}>
      <View style={styles.brandSearchForm}>
        <View style={styles.sectionSearch}>
          <TextInput
            placeholder="Search by contact number"
            textAlign="center"
            keyboardType="numeric"
            onChangeText={text => {
              setSearchQuery(text);
            }}
            style={styles.searchStyleInput}
            value={searchQuery}
            selectionColor="#183153"
          />
          <FontAwesome name="search" size={20} style={styles.searchIcon} />
        </View>
      </View>

      {searchQuery === '' ? null : (
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          {loading && page === 1 ? (
            <Loader />
          ) : trackList.length > 0 ? (
            trackList.map((item, index) => (
              <View style={styles.cardContainer} key={index}>
                <View style={styles.cardWrap}>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <Text style={styles.textStyle}>
                        Invoice : {item?.invoice_number}
                      </Text>
                      <Text style={styles.textStyle}>
                        Phone Number : {item?.phone_number}
                      </Text>
                      <Text style={styles.textStyle}>
                        Delivery Status : {item?.delivery_conformations}
                      </Text>
                      <Text>Address : {item?.user_address}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noParcel}>
              <FontAwesome name="exclamation-circle" size={40} color="red" />
              <Text style={styles.noParcelText}>No matching parcel found</Text>
            </View>
          )}
          {loading && page > 1 && <Loader />}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  trackingParcelContainer: {
    margin: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardWrap: {
    flex: 1,
    width: 100,
    margin: 1,
    padding: 2,
  },
  card: {
    borderRadius: 6,
    elevation: 2,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  textStyle: {
    marginBottom: 4,
    fontSize: 14,
    textAlign: 'left',
  },
  noParcel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noParcelText: {
    marginTop: 10,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  brandSearchForm: {
    marginTop: 5,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 5,
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
        overflow: 'hidden',
        margin: 8,
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
        margin: 8,
      },
    }),
  },
  searchStyleInput: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginLeft: 10,
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

export default TrackingMyParcel;
