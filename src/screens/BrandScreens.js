/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Brand from '../components/Brand/Brand';
import {getBrandData} from '../api/Brand/brand';
import Loader from '../components/Loader/loader';

const BrandScreens = ({navigation}) => {
  const [brand, setBrandList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page state
  const [hasMore, setHasMore] = useState(true); // State to check if more data is available

  useEffect(() => {
    fetchBrands();
  }, [page]);

  const fetchBrands = async () => {
    if (!hasMore) {
      return;
    } // Do not fetch if there's no more data
    setLoading(true);
    const data = await getBrandData(page); // Fetch brands with current page
    setBrandList(prevBrands => [...prevBrands, ...data.results]); // Append new brands
    setHasMore(data.next !== null); // Update hasMore based on API response
    setLoading(false);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1); // Increment page for next fetch
    }
  };

  // Filter brands based on search value
  let brandValue = brand.filter(brand => {
    if (searchValue === '') {
      return brand;
    }
    return brand.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.brandContainer}>
      {loading && page === 1 ? (
        <Loader />
      ) : (
        <View style={styles.brand}>
          <View style={styles.brandSearchForm}>
            <View style={styles.sectionSearch}>
              <TextInput
                name="searchData"
                placeholder="Search Our Brand Name"
                textAlign="center"
                onChangeText={setSearchValue}
                style={styles.searchStyleInput}
                value={searchValue}
                selectionColor="#183153"
              />
              <FontAwesome name="search" size={20} style={styles.searchIcon} />
            </View>
          </View>
          <ScrollView onScrollEndDrag={loadMore}>
            <Brand
              brandValue={brandValue}
              searchValue={searchValue}
              navigation={navigation}
            />
            {loading && <Loader />}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  brand: {
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
  brandTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
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

export default BrandScreens;
