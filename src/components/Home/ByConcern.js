import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {globalStyle} from '../styles';

const ByConcern = ({byConcern, navigation}) => {
  return (
    <View style={globalStyle.container}>
      {byConcern.map((concern, index) => (
        <View style={globalStyle.card} key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductListByCategoryStack', {
                screen: 'ProductListByCategory',
                params: {query: `solution/${concern.slug}`},
              })
            }>
            <View style={globalStyle.cardContent}>
              <Image
                source={{uri: concern.image}}
                style={globalStyle.cardImage}
              />
              <Text style={globalStyle.cardTitle}>{concern.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ByConcern;
