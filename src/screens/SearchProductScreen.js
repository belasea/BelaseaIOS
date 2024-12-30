/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
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

import ProductList from '../components/ProductList/ProductList';
import {productSearchApi} from '../api/Products/products';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 40;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const SearchProductScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [dataLoad, setDataLoad] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Name ASC', value: '1'},
    {label: 'Name DESC', value: '2'},
    {label: 'Price ASC', value: '3'},
    {label: 'Price DESC', value: '4'},
    {label: 'Discount ASC', value: '5'},
    {label: 'Discount DESC', value: '6'},
  ]);
  const [productList, setProductList] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = data => {
    setSearchQuery(data);

    setTimeout(() => {
      navigation.navigate('SearchProductStack', {
        screen: 'SearchProduct',
        params: {
          search_query: data,
        },
      });
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDataLoad(true);
      setPageNumber(1);
      // setPageNumber(1);
    });
    return unsubscribe;
  }, [navigation]);

  const searchProductData = async () => {
    setPageNumber(1);
    productSearchApi(route.params.search_query, pageNumber).then(data => {
      let productListJSON = [];
      data.results.map(item => {
        let productJson = {
          id: item.products[0].id,
          title: item.title,
          description: item.description,
          old_price: item.products[0].old_price,
          app_price: item.products[0].app_price,
          active: item.products[0].active,
          brand: item.brand,
          image: item.image,
          app_discount: item.app_discount,
          slug: item.slug,
        };

        productListJSON.push(productJson);
      });

      setProductList(productListJSON);
      setLoading(false);
      let totalPage = (data.count + 24 - 1) / 24;
      setTotalPageNumber(totalPage);
    });
  };

  const dupSearchProductData = async pageData => {
    setLoading(true);
    productSearchApi(route.params.search_query, pageData)
      .then(data => {
        let productListJSON = [];
        data.results.map(item => {
          let productJson = {
            id: item.products[0].id,
            title: item.title,
            description: item.description,
            old_price: item.products[0].old_price,
            app_price: item.products[0].app_price,
            active: item.products[0].active,
            brand: item.brand,
            image: item.image,
            app_discount: item.app_discount,
            slug: item.slug,
          };

          productListJSON.push(productJson);
        });

        let updateList = [...productList, ...productListJSON];
        setProductList(updateList);
        setLoading(false);
        setPageNumber(pageNumber + 1);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    searchProductData();
  }, [route.params?.search_query, value, dataLoad]);

  return (
    <SafeAreaView style={styles.productListContainer}>
      <View style={styles.productListWrap}>
        <View style={styles.sectionSearch}>
          <TextInput
            name="search_product"
            onChangeText={text => handleSearchChange(text, navigation)}
            value={searchQuery}
            placeholder="Search Product or Brand Name"
            textAlign="center"
            style={styles.searchStyleInput}
            selectionColor="#000"
            placeholderTextColor="#000"
          />
          <FontAwesome name="search" size={20} style={styles.searchIcon} />
        </View>
        <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              let updateValue = pageNumber + 1;
              if (parseInt(totalPageNumber) >= parseInt(updateValue)) {
                dupSearchProductData(updateValue);
              }
            }
          }}
          scrollEventThrottle={400}>
          <ProductList
            productList={productList}
            navigation={navigation}
            loading={loading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionSearch: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#183153',
        height: 40,
        borderRadius: 15,
        margin: 5,
        textAlign: 'center',
        overflow: 'hidden',
      },
      android: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#183153',
        height: 40,
        borderRadius: 15,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
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
    color: '#000',
  },
  searchIcon: {
    backgroundColor: '#183153',
    color: '#FFF',
    padding: 10,
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  productListContainer: {
    flex: 1,
  },
  productListWrap: {
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
});

export default SearchProductScreen;
