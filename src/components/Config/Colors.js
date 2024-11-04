import React from 'react';
import {StyleSheet, Text} from 'react-native';

function Colors({children}) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    header: '#293352',
  },
});
export default Colors;
