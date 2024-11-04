import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ProductDetailSliderImage = ({item}) => {
  return (
    <View style={styles.productDetailSliderCard}>
      <Image
        source={{uri: `${item.image}`}}
        style={styles.productDetailSliderImage}
      />
      {item.app_discount > 0 ? (
        <Text style={styles.productDetailDiscount}>
          {item.app_discount} % off
        </Text>
      ) : (
        <Text />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productDetailSliderCard: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 10,
  },
  productDetailSliderImage: {
    width: screenWidth - 25,
    height: 330,
    resizeMode: 'cover',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productDetailDiscount: {
    position: 'absolute',
    color: '#FFF',
    backgroundColor: '#E04F54',
    padding: 2,
    width: 70,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
});

export default ProductDetailSliderImage;
