/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

import AsyncStorage from '@react-native-async-storage/async-storage';
import RelatedProduct from '../components/ProductDetails/RelatedProduct';
import ProductDetailSliderImage from '../components/ProductDetails/ProductDetailSliderImage';
import Loader from '../components/Loader/loader';

import {CartContext} from '../contexts/CartContext';
// import {AuthContext} from '../contexts/AuthContext';
import {getProduct} from '../api/Products/products';
import {getHotDealsProductsOfferList} from '../api/HotDeals/hotDeals';
import {BASE_URL} from '../api/api';

const ProductDetailScreen = ({navigation, route}) => {
  const {setTotalQuantity} = useContext(CartContext);
  // const {isAuthenticated} = useContext(AuthContext);
  const [productData, setProductData] = useState({});
  const [hotDeals, setHotDeals] = useState([]);
  const [loader, setLoader] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const {product} = route.params;

  useEffect(() => {
    getProduct(product.slug).then(data => {
      setProductData(data);
      setLoader(false);
    });

    getHotDealsProductsOfferList().then(data => {
      setHotDeals(data);
    });
  }, [product]);

  // Add to cart =======================================================
  const addToCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productData?.id,
          quantity: 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === false) {
        infoAlert('Error', responseData.msg);
      } else {
        // Update quantity to context
        setQuantity(quantity + 1);
        setTotalQuantity(responseData?.total_quantity);
        // Display success alert
        infoAlert('Title', `${productData?.title} added to cart successfully.`);
      }
    } catch (error) {
      infoAlert('Error adding to cart:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productData?.id,
          quantity: 1,
          increase: true,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === false) {
        infoAlert('Error', responseData.msg);
      } else {
        // Update quantity to context
        setQuantity(quantity + 1);
        setTotalQuantity(responseData?.total_quantity);
        infoAlert(
          'Quantity Increased',
          'Quantity has been increased successfully.',
        );
      }
    } catch (error) {
      infoAlert('Error adding to cart:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity <= 1) {
      infoAlert('Error', 'Quantity cannot be less than 1.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/carts/api/cart-list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productData?.id,
          quantity: 1,
          decrease: true,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === false) {
        infoAlert('Error', responseData.msg);
      } else {
        // Update quantity to context
        setQuantity(quantity - 1);
        setTotalQuantity(responseData?.total_quantity);
        // Display success alert
        infoAlert(
          'Quantity Decreased',
          'Quantity has been decreased successfully.',
        );
      }
    } catch (error) {
      infoAlert('Error adding to cart:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = async () => {
    Alert.alert("You can't add to Cart", 'Please login before proceeding !');
    // navigation.navigate('LoginStack');
    setTimeout(() => {
      navigation.navigate('LoginStack');
    }, 2000);
  };

  // Message ===========================================================
  const infoAlert = (title, message) => {
    Alert.alert('', message, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => null,
      },
    ]);
  };

  function Pagination({index}) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {productData.product_list_data.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({item, index}) {
    return (
      <ProductDetailSliderImage
        item={item}
        navigation={navigation}
        key={index}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.productDetailContainer}>
      {loader ? (
        <Loader />
      ) : (
        <View style={styles.productDetailWrap}>
          <ScrollView>
            <View style={styles.productDetailContent}>
              <Text style={styles.productDetailMainTitle}>
                {productData?.title}
              </Text>
              <View>
                <FlatList
                  data={productData.product_list_data}
                  style={styles.carousel}
                  renderItem={renderItem}
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  onScroll={onScroll}
                  {...flatListOptimizationProps}
                />
                <View style={{marginTop: 15}} />
                <Pagination index={index} />
              </View>
              <View style={{marginBottom: 10}} />
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '75%', marginBottom: 20}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.productDetailHealthTips}>
                      Health tips : {productData.health_tips}
                    </Text>
                  </View>
                </View>
                {/* <View style={{width: '18%'}}>
                  <View style={{flex: 1}}>
                    {productData.active && (
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <TouchableOpacity onPress={handleDecreaseQuantity}>
                            <Text style={styles.plusButton}>-</Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                          <Text style={styles.quantityButton}>{quantity}</Text>
                        </TouchableOpacity>
                        <View>
                          <TouchableOpacity onPress={handleIncreaseQuantity}>
                            <Text style={styles.minusButton}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View> */}
                {/* <View style={{width: '18%'}}>
                  <View style={{flex: 1}}>
                    {productData.active && (
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <TouchableOpacity
                            onPress={handleDecreaseQuantity}
                            disabled={quantity <= 1} // Disable if quantity is 1 or less
                          >
                            <Text
                              style={[
                                styles.plusButton,
                                quantity <= 1 && styles.disabledButton,
                              ]}>
                              -
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                          <Text style={styles.quantityButton}>{quantity}</Text>
                        </TouchableOpacity>
                        <View>
                          <TouchableOpacity onPress={handleIncreaseQuantity}>
                            <Text style={styles.minusButton}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View> */}
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%', marginTop: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Price: ৳
                    </Text>
                    <Text style={styles.productDetailNewPrice}>
                      {productData?.app_price}
                    </Text>
                    <Text style={styles.productDetailOldPrice}>
                      {productData?.old_price}
                    </Text>
                  </View>
                </View>
                <View style={{width: '30%'}}>
                  <>
                    <>
                      {productData.active ? (
                        <TouchableOpacity onPress={addToCart}>
                          <Text style={styles.addToCartButton}>Buy Now</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.outOfStockButton}>
                          Out Of Stock
                        </Text>
                      )}
                    </>
                  </>

                  {/* <>
                    {isAuthenticated ? (
                      <>
                        {productData.active ? (
                          <TouchableOpacity onPress={addToCart}>
                            <Text style={styles.addToCartButton}>Buy Now</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.outOfStockButton}>
                            Out Of Stock
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        <TouchableOpacity onPress={handleLogin}>
                          <Text style={styles.addToCartButton}>Buy Now</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </> */}
                </View>
              </View>
              <Text style={styles.productDetailWeight}>
                Weight : {productData?.weight}
              </Text>
              <Text style={styles.productDescriptionTop}>Description :</Text>
              <Text style={styles.productDetailDescription}>
                <Text style={styles.productDescription}>
                  {productData?.description}
                </Text>
              </Text>
            </View>
            {/* Related Product */}
            <View style={styles.relatedProduct}>
              <Text style={styles.relatedProductTitle}>Hot Deals </Text>
              <View style={styles.relatedProductContent}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={hotDeals}
                  renderItem={({item}) => {
                    return (
                      <>
                        <RelatedProduct item={item} navigation={navigation} />
                      </>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productDetailContainer: {
    flex: 1,
    color: '#000000',
  },
  productDetailWrap: {
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
  productDetailTitleWrap: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    marginBottom: 5,
  },
  productDescriptionTop: {
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  productDescription: {
    textAlign: 'justify',
    lineHeight: 25,
    color: '#000',
  },
  /* Product Detail Content */
  productDetailContent: {
    margin: 10,
  },
  productDetailImage: {
    width: '100%',
    height: 310,
    borderRadius: 7,
    marginBottom: 7,
  },
  productDetailMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
  },
  productDetailDiscount: {
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 4,
  },
  productDetailHealthTips: {
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 5,
    color: '#000',
  },
  productDetailWeight: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#000',
  },
  productDetailOldPrice: {
    color: '#E04F54',
    marginLeft: 10,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  productDetailNewPrice: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  addToCartButton: {
    padding: 7,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#F9C65D',
    color: '#000',
  },
  outOfStockButton: {
    padding: 1,
    backgroundColor: '#E04F54',
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#E04F54',
    fontSize: 12,
    width: 90,
  },
  addToCartButtonDis: {
    padding: 7,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#F9C65D',
    opacity: 0.6,
  },
  addToCart: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
  },
  plusButton: {
    padding: 8,
    backgroundColor: '#ccccca',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    overflow: 'hidden',
  },
  plusButtonDis: {
    padding: 8,
    backgroundColor: '#ccccca',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    opacity: 0.6,
    overflow: 'hidden',
  },
  quantityButton: {
    backgroundColor: '#E5E5E5',
    padding: 8,
    width: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  minusButton: {
    padding: 8,
    backgroundColor: '#ccccca',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
  },
  minusButtonDis: {
    padding: 8,
    backgroundColor: '#ccccca',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    opacity: 0.6,
    overflow: 'hidden',
  },
  productDetailDescription: {
    textAlign: 'justify',
    margin: 5,
  },
  /* Related Product */
  relatedProduct: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  relatedProductTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    color: '#000',
  },
  relatedProductContent: {
    flex: 1,
    flexDirection: 'row',
  },

  /* Comment & Replay */
  commentReplay: {
    marginBottom: 1,
  },
  commentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  // Related Slider
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: '#183153',
  },
  paginationDotInactive: {
    backgroundColor: 'gray',
  },
  carousel: {flex: 1},
});

export default ProductDetailScreen;
