import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {globalStyle} from '../styles';

const BySkin = ({bySkin, navigation}) => {
  return (
    <View style={globalStyle.container}>
      {bySkin.map((skin, index) => (
        <View style={globalStyle.card} key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductListByCategoryStack', {
                screen: 'ProductListByCategory',
                params: {query: `solution/${skin.slug}`},
              })
            }>
            <View style={globalStyle.cardContent}>
              <Image source={{uri: skin.image}} style={globalStyle.cardImage} />
              <Text style={globalStyle.cardTitle}>{skin.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default BySkin;
