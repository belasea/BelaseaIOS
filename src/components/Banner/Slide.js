import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Slide = ({item, index, navigation}) => {
  if (item.small_device_url) {
    return (
      <View style={styles.cardView} key={index}>
        {item.url_field ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductListByCategoryStack', {
                screen: 'ProductListByCategory',
                params: {query: 'product-offer/offer'},
              })
            }>
            <Image style={styles.image} source={{uri: item.small_device_url}} />
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={{uri: item.small_device_url}} />
        )}
        <View style={styles.textView} />
      </View>
    );
  } else {
    return (
      <View style={styles.cardView}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.textView} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 0,
    height: height / 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 0,
    height: height / 3,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default Slide;
