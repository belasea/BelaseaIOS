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

const EmptyCart = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FontAwesome name="shopping-cart" size={150} color="#293352" />
        <Text style={styles.emptyTitle}>Your shopping cart is empty</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
          <Text style={styles.noDataFound}>
            Click here to continue shopping
          </Text>
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
  emptyTitle: {
    fontWeight: 'bold',
  },
  noDataFound: {
    marginTop: 10,
    padding: 7,
    backgroundColor: '#F9C65D',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#F9C65D',
    color: '#0C0C0C',
  },
});
export default EmptyCart;
