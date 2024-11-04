================ old code =====================================
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader/loader';
import {BASE_URL} from '../api/api';
import {AuthContext} from '../contexts/AuthContext';

const TrackingMyParcelScreen = ({navigation}) => {
  const [trackingMyParcel, setTrackingMyParcel] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const {user, isAuthenticated} = useContext(AuthContext);
  const contact_number = user?.contact_number;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/tracking-parcel-list/${contact_number}/?page=${page}&query=${searchValue}`,
      );
      const data = await res.json();
      setTrackingMyParcel(data?.results?.data || []);
      setHasMoreResults(data?.results?.data?.length > 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching purchase order data:', error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = () => {
    setPage(1);
    setTrackingMyParcel([]);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, searchValue]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchValue('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      {isAuthenticated ? (
        <View>
          <View style={styles.sectionSearch}>
            <TextInput
              name="searchData"
              placeholder="Search by invoice no"
              textAlign="center"
              keyboardType="numeric"
              style={styles.searchStyleInput}
              selectionColor="#183153"
              value={searchValue}
              onChangeText={setSearchValue}
            />
            <TouchableOpacity onPress={handleSearch}>
              <FontAwesome name="search" size={20} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View>
              {loading ? (
                <Loader />
              ) : trackingMyParcel && trackingMyParcel.length > 0 ? (
                trackingMyParcel.map((item, index) => (
                  <View style={styles.cardContainer} key={index}>
                    <View style={styles.cardWrap}>
                      <View style={styles.card}>
                        <View style={styles.cardContent}>
                          <Text style={styles.textStyle}>
                            Invoice No : {item?.invoice_number}
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
                <View style={styles.noPurchase}>
                  <FontAwesome
                    name="exclamation-circle"
                    size={40}
                    color="red"
                  />
                  <Text style={styles.noPurchaseText}>
                    No matching data found
                  </Text>
                </View>
              )}
              {!loading &&
                !searchValue &&
                hasMoreResults && ( // Conditionally render Load More button
                  <TouchableOpacity onPress={handleLoadMore}>
                    <Text style={styles.loadMoreButton}>Load More</Text>
                  </TouchableOpacity>
                )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.notLogin}>
          <Text style={styles.notLoginMessage}>
            Sorry ! you are not login !
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginStack')}>
            <Text style={styles.loadMoreButton}>Go To Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
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
  },
  searchIcon: {
    backgroundColor: '#1b3c60',
    color: '#FFF',
    padding: 10,
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },

  cardWrap: {
    flex: 1,
    width: 100,
    margin: 1,
    padding: 2,
  },

  card: {
    paddingTop: 10,
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

  cardContent: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 2,
  },

  textStyle: {
    marginBottom: 4,
    fontSize: 14,
    textAlign: 'left',
  },

  noPurchase: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPurchaseText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  pdfIcon: {
    marginTop: 2,
  },
  invoiceID: {
    marginTop: 10,
    textAlign: 'center',
  },
  loadMoreButton: {
    marginTop: 7,
    padding: 7,
    backgroundColor: '#183153',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    borderColor: '#FFF',
    color: '#FFF',
    overflow: 'hidden',
    fontSize: 16,
  },
  notLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notLoginMessage: {
    color: '#000',
    fontSize: 18,
  },
});

export default TrackingMyParcelScreen;
