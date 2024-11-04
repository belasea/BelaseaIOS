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

const CategoryByConcern = ({byConcern, navigation}) => {
  return (
    <SafeAreaView>
      <Text style={styles.byConcernTitle}>Category By Concern</Text>
      <View style={globalStyle.container}>
        {byConcern.map((categoryConcern, index) => (
          <View style={globalStyle.card} key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductListByCategory', {
                  query: `solution/${categoryConcern.slug}`,
                })
              }>
              <View style={globalStyle.cardContent}>
                <Image
                  source={{uri: categoryConcern.image}}
                  style={globalStyle.cardImage}
                />
                <Text style={globalStyle.cardTitle}>
                  {categoryConcern.title}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  byConcernTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default CategoryByConcern;
