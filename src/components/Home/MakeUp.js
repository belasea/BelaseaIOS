import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {globalStyle} from '../styles';

const MakeUp = ({byMakeup, navigation}) => {
  return (
    <View style={globalStyle.container}>
      {byMakeup.map((makeup, index) => (
        <View style={globalStyle.card} key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductListByCategoryStack', {
                screen: 'ProductListByCategory',
                params: {query: `solution/${makeup.slug}`},
              })
            }>
            <View style={globalStyle.cardContent}>
              <Image
                source={{uri: makeup.image}}
                style={globalStyle.cardImage}
              />
              <Text style={globalStyle.cardTitle}>{makeup.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default MakeUp;
