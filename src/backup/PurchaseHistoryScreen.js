/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader/loader';
import {BASE_URL} from '../api/api';

import {AuthContext} from '../contexts/AuthContext';

const PurchaseHistoryScreen = ({navigation}) => {
  const [purchaseOrder, setPurchaseOrder] = useState([]);
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
        `${BASE_URL}/api/purchase-order-list/${contact_number}/?page=${page}&query=${searchValue}`,
      );
      const data = await res.json();
      setPurchaseOrder(data?.results?.data || []);
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
    setPurchaseOrder([]);
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
    <View style={styles.purchaseContainer}>
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
              ) : purchaseOrder && purchaseOrder.length > 0 ? (
                purchaseOrder.map((item, index) => (
                  <View style={styles.card} key={index}>
                    <View style={styles.cardInvoice}>
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(
                            `${BASE_URL}/invoices/list/${item.slug}`,
                          );
                        }}>
                        <Text style={styles.pdfIcon}>
                          <FontAwesome
                            name="file-pdf-o"
                            size={60}
                            color="black"
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.invoiceID}>
                        Invoice No : {item.slug}
                      </Text>
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
  purchaseContainer: {
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

export default PurchaseHistoryScreen;
