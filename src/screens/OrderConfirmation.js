import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OrderConfirmation = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.successfulTitle}>Your order is Successful.</Text>
        <Text style={styles.printTitle}>Print your invoice</Text>
        <TouchableOpacity>
          <FontAwesome name="file-pdf-o" size={80} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
  successfulTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  printTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default OrderConfirmation;
