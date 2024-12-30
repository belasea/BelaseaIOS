/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import {bela} from '../api/api';

import ProductList from '../components/ProductList/ProductList';
import Loader from '../components/Loader/loader';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 40;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ProductListByCategoryScreen = ({navigation, route}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [items, setItems] = useState([
    {label: 'Name ASC', value: '1'},
    {label: 'Name DESC', value: '2'},
    {label: 'Price ASC', value: '3'},
    {label: 'Price DESC', value: '4'},
    {label: 'Discount ASC', value: '5'},
    {label: 'Discount DESC', value: '6'},
  ]);

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOpen(false);
      setPageNumber(1);
    });

    return unsubscribe;
  }, [navigation]);

  const getProductsList = async () => {
    setOpen(false);
    let url_suffix = route.params.query;
    let productListJSON = [];
    setLoading(true);
    let res;
    if (value) {
      res = await bela(
        `/products/api/${url_suffix}/?sort_by=${value}/?page=${pageNumber}`,
      );
    } else {
      res = await bela(`/products/api/${url_suffix}/?page=${pageNumber}`);
    }

    res.data.results.map(item => {
      let productJson = {
        id: item.products[0].id,
        title: item.title,
        description: item.description,
        app_price: item.products[0].app_price,
        old_price: item.products[0].old_price,
        active: item.products[0].active,
        brand: item.brand,
        image: item.image,
        discount: item.discount,
        app_discount: item.app_discount,
        slug: item.slug,
      };
      productListJSON.push(productJson);
    });

    setTotalPageNumber(res.data.total_page);
    setProductList(productListJSON);
    setLoading(false);
    setOpen(false);
  };

  const dupGetProductsList = async () => {
    setOpen(false);
    let url_suffix = route.params.query;
    let productListJSON = [];
    setLoading(true);
    let res;
    let page = pageNumber + 1;
    if (value) {
      res = await bela(
        `/products/api/${url_suffix}/?sort_by=${value}/?page=${page}`,
      );
    } else {
      res = await bela(`/products/api/${url_suffix}/?page=${page}`);
    }

    res.data.results.map(item => {
      let productJson = {
        id: item.products[0].id,
        title: item.title,
        description: item.description,
        app_price: item.products[0].app_price,
        old_price: item.products[0].old_price,
        active: item.products[0].active,
        brand: item.brand,
        image: item.image,
        app_discount: item.app_discount,
        limit_buy: item.limit_buy,
        slug: item.slug,
      };

      productListJSON.push(productJson);
    });

    let updateList = [...productList, ...productListJSON];
    setProductList(updateList);

    setLoading(false);
    setPageNumber(pageNumber + 1);
    setOpen(false);
  };

  useEffect(() => {
    setMainLoader(true);
    getProductsList().then(() => setMainLoader(false));
  }, [route.params?.query]);

  useEffect(() => {}, [productList]);

  const sortProductsByDescPrice = () => {
    let sortList = productList.sort(
      (a, b) => parseFloat(b.old_price) - parseFloat(a.old_price),
    );
    setProductList(sortList);
  };

  const sortProductsByAscPrice = () => {
    let sortList = productList.sort(
      (a, b) => parseFloat(a.old_price) - parseFloat(b.old_price),
    );
    setProductList(sortList);
  };

  const sortProductsByDiscountAscPrice = () => {
    let sortList = productList.sort(
      (a, b) => parseFloat(a.app_discount) - parseFloat(b.app_discount),
    );
    setProductList(sortList);
  };

  const sortProductsByDiscountDescPrice = () => {
    let sortList = productList.sort(
      (a, b) => parseFloat(b.old_price) - parseFloat(a.old_price),
    );
    setProductList(sortList);
  };

  const sortProductsByDescName = () => {
    let sortList = productList.sort((a, b) => b.title.localeCompare(a.title));
    setProductList(sortList);
  };

  const sortProductsByAscName = () => {
    let sortList = productList.sort((a, b) => a.title.localeCompare(b.title));
    setProductList(sortList);
  };

  if (mainLoader) {
    return (
      <SafeAreaView style={styles.productListContainer}>
        <Loader />
      </SafeAreaView>
    );
  }

  if (productList.length > 0) {
    return (
      <SafeAreaView style={styles.productListContainer}>
        {productList.length > 0 && (
          <View style={[styles.viewContainer]}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <View style={{flex: 1}}>
                <View style={styles.shortBy}>
                  <Text style={styles.shortByTitle}>Sort By</Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Sort by value"
                  style={{
                    marginTop: 2,
                    borderRadius: 5,
                    borderColor: '#183153',
                    minHeight: 35,
                  }}
                  onSelectItem={item => {
                    // console.log("Data", item['value'])
                    if (item.value == 4) {
                      sortProductsByDescPrice();
                    }
                    if (item.value == 3) {
                      sortProductsByAscPrice();
                    }
                    if (item.value == 5) {
                      sortProductsByDiscountAscPrice();
                    }
                    if (item.value == 6) {
                      sortProductsByDiscountDescPrice();
                    }
                    if (item.value == 1) {
                      sortProductsByAscName();
                    }
                    if (item.value == 2) {
                      sortProductsByDescName();
                    }
                  }}
                />
              </View>
            </View>
          </View>
        )}

        <View style={styles.productListWrap}>
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                let updateValue = pageNumber + 1;
                if (parseInt(totalPageNumber) >= parseInt(updateValue)) {
                  dupGetProductsList();
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
  } else {
    return (
      <SafeAreaView style={styles.productListContainer}>
        <View style={styles.noProductWrap}>
          <Feather name="shopping-bag" size={150} color="#293352" />
          <Text style={styles.noProductTitle}>No Product Found</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
            <Text style={styles.productNotDataFound}>
              Click here to continue shopping
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  productListContainer: {
    flex: 1,
    color: '#000000',
  },
  productListWrap: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: '0%',
        color: '#000000',
      },
      android: {
        marginBottom: 0,
        color: '#000000',
      },
    }),
  },
  viewContainer: {
    marginHorizontal: 4,
    zIndex: 1,
  },

  shortBy: {
    overflow: 'hidden',
  },

  shortByTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  noProductWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 2,
    color: '#000',
  },
  productNotDataFound: {
    marginTop: 10,
    padding: 7,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#F9C65D',
    color: '#0C0C0C',
  },
});

export default ProductListByCategoryScreen;
