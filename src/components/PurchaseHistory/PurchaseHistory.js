import React from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {BASE_URL} from '../../api/api';

const PurchaseHistory = ({purchaseHistory}) => {
  return (
    <View style={styles.cardContainer}>
      {purchaseHistory.map(item => (
        <View style={styles.card} key={item.id}>
          <View style={styles.cartInvoice}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${BASE_URL}/invoices/list/${item.slug}`);
              }}>
              <Text style={styles.fileIcon}>
                <FontAwesome name="file-pdf-o" size={60} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.invoiceNo}>Invoice No : {item.slug}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 5,
    marginLeft: 7,
    marginRight: 7,
  },
  card: {
    borderRadius: 6,
    elevation: 2,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cartInvoice: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  fileIcon: {
    marginTop: 2,
  },
  invoiceNo: {
    marginTop: 10,
    textAlign: 'center',
  },

  cardContent: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 2,
  },

  cardContentMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  cardLeftContent: {
    width: '40%',
  },
  cardLeftTitleContent: {
    fontWeight: 'bold',
  },
  cardRightContent: {
    width: '60%',
  },
});

export default PurchaseHistory;
