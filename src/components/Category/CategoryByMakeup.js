import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {globalStyle} from '../styles';

const CategoryByMakeup = ({byMakeup, navigation}) => {
  return (
    <SafeAreaView>
      <Text style={styles.byMakeupTitle}>Category By Makeup</Text>
      <View style={globalStyle.container}>
        {byMakeup.map((categoryMakeup, index) => (
          <View style={globalStyle.card} key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductListByCategory', {
                  query: `solution/${categoryMakeup.slug}`,
                })
              }>
              <View style={globalStyle.cardContent}>
                <Image
                  source={{uri: categoryMakeup.image}}
                  style={globalStyle.cardImage}
                />
                <Text style={globalStyle.cardTitle}>
                  {categoryMakeup.title}
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
  byMakeupTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default CategoryByMakeup;
