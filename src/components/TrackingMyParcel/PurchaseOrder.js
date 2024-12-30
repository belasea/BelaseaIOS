/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getPurchaseOrderData} from '../../api/PurchaseOrder/purchaseOrder';
import Loader from '../Loader/loader';
import debounce from 'lodash.debounce';
import {BASE_URL} from '../../api/api';

const PurchaseOrder = ({navigation}) => {
  const [trackList, setTrackList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Debounce the search function to prevent unnecessary API calls while typing
  const debouncedSearch = useCallback(
    debounce(query => {
      setTrackList([]);
      setPage(1);
      setHasMore(true);
      if (query) {
        getTrackingList(query, 1);
      }
    }, 300),
    [],
  );

  const getTrackingList = async (query, pageNum) => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);

    try {
      const data = await getPurchaseOrderData(query, pageNum);
      if (data?.results?.data.length === 0) {
        setHasMore(false);
      } else {
        setTrackList(prevTrackList =>
          pageNum === 1
            ? data.results.data
            : [...prevTrackList, ...data.results.data],
        );
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1 && searchQuery) {
      getTrackingList(searchQuery, page);
    }
  }, [page]);

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
    if (bottom && hasMore && !loading) {
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
            onChangeText={text => setSearchQuery(text)}
            style={styles.searchStyleInput}
            value={searchQuery}
            selectionColor="#000"
            placeholderTextColor="#000"
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
              <View style={styles.card} key={index}>
                <View style={styles.cardInvoice}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`${BASE_URL}/invoices/list/${item.slug}`);
                    }}>
                    <Text style={styles.fileIcon}>
                      <FontAwesome name="file-pdf-o" size={60} color="black" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.invoiceNo}>Invoice No : {item.slug}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noPurchase}>
              <FontAwesome name="exclamation-circle" size={40} color="red" />
              <Text style={styles.noPurchaseText}>No matching data found</Text>
            </View>
          )}
          {loading && page > 1 && <Loader />}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  purchaseContainer: {
    margin: 10,
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
        textAlign: 'center',
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
        textAlign: 'center',
      },
    }),
  },
  searchStyleInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  searchIcon: {
    backgroundColor: '#1b3c60',
    color: '#FFF',
    padding: 10,
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
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
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cardInvoice: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  fileIcon: {
    marginTop: 2,
  },
  invoiceNo: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
  },
  cardContent: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 2,
  },
  noPurchase: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPurchaseText: {
    marginTop: 10,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default PurchaseOrder;
