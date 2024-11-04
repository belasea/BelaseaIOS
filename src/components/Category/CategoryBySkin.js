import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {globalStyle} from '../styles';

const CategoryBySkin = ({bySkin, navigation}) => {
  return (
    <SafeAreaView>
      <Text style={styles.bySkinTitle}>Category By Skin</Text>
      <View style={globalStyle.container}>
        {bySkin.map((categorySkin, index) => (
          <View style={globalStyle.card} key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductListByCategory', {
                  query: `solution/${categorySkin.slug}`,
                })
              }>
              <View style={globalStyle.cardContent}>
                <Image
                  source={{uri: categorySkin.image}}
                  style={globalStyle.cardImage}
                />
                <Text style={globalStyle.cardTitle}>{categorySkin.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bySkinTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default CategoryBySkin;
