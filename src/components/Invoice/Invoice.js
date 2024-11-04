/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {BASE_URL} from '../../api/api';

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Invoice = ({invoiceData, navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginTop: 40}}>
            <Text style={styles.thankYou}>Congratulations !</Text>
            <Text style={{textAlign: 'center', marginTop: 10}}>
              <FontAwesome name="check-circle-o" size={80} color="green" />
            </Text>
            <Text style={styles.orderCompleted}>
              Your order has been placed
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', marginTop: 2}}>
              We will contact you soon
            </Text>
            <View style={styles.billingCard}>
              <Text style={styles.orderSummary}>Summary of your Order</Text>
              <View style={styles.orderSummaryContent}>
                <View style={styles.orderSummaryLeftContent}>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
                    Invoice no{' '}
                  </Text>
                </View>
                <View style={styles.orderSummaryRightContent}>
                  <Text>: {invoiceData?.invoice?.slug.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.orderSummaryContent}>
                <View style={styles.orderSummaryLeftContent}>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
                    Phone no{' '}
                  </Text>
                </View>
                <View style={styles.orderSummaryRightContent}>
                  <Text>
                    : {invoiceData.invoice?.addresses?.contact_number}
                  </Text>
                </View>
              </View>
              <View style={styles.orderSummaryContent}>
                <View style={styles.orderSummaryLeftContent}>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
                    Amount to be paid{' '}
                  </Text>
                </View>
                <View style={styles.orderSummaryRightContent}>
                  <Text>: {invoiceData?.invoice?.total_cost_with_tax} ৳</Text>
                </View>
              </View>
              <View style={styles.orderSummaryContent}>
                <View style={styles.orderSummaryLeftContent}>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
                    Address
                  </Text>
                </View>
                <View style={styles.orderSummaryRightContent}>
                  <Text>
                    : {invoiceData.invoice.addresses.location},{' '}
                    {invoiceData.invoice.addresses.city}
                  </Text>
                </View>
              </View>
              <View style={styles.orderSummaryContent}>
                <View style={styles.orderSummaryLeftContent}>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>
                    Track your order
                  </Text>
                </View>
                <View style={styles.orderSummaryRightContent}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TrackingMyParcelStack')
                    }>
                    <Text style={{marginBottom: 5, color: 'blue'}}>
                      : Click Here
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* {invoiceData.invoice.delivery_charge > 130 ? (
                <Text style={{marginTop: 4, textAlign: 'justify'}}>
                  <Text style={{fontWeight: 'bold', marginRight: 4}}>
                    Note :{' '}
                  </Text>
                  Dear Sir/Ma'am, please pay BDT{' '}
                  {invoiceData.invoice.delivery_charge} by Bkash and rest cash
                  on delivery. Please check your products in front of the
                  delivery man. Please call @ 01305-606540 (Bkash personal
                  number) for help.
                </Text>
              ) : (
                <Text style={{marginTop: 4, textAlign: 'justify'}}>
                  <Text style={{fontWeight: 'bold', marginRight: 4}}>
                    Note :{' '}
                  </Text>
                  Dear Sir/Ma'am, payment are cash on delivery. Please check
                  your products in front of the delivery man. For any help,
                  please call as @ 01305-606540.
                </Text>
              )} */}
              <Text style={{marginTop: 4, textAlign: 'justify'}}>
                <Text style={{fontWeight: 'bold', marginRight: 4}}>
                  Note :{' '}
                </Text>
                {invoiceData?.delivery_message}
              </Text>
            </View>

            <View style={styles.downloadIInvoice}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `${BASE_URL}/invoices/list/${invoiceData.invoice.slug}`,
                  );
                }}>
                <Text style={styles.downloadInvoiceButton}>Print Invoice</Text>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeStack')}>
                <Text style={styles.shopMore}>Shop More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    color: '#000',
  },
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: '0%',
      },
      android: {
        marginBottom: 0,
      },
    }),
    margin: 5,
    // backgroundColor: "red"
  },

  billing: {
    flex: 1,
  },
  billingCard: {
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 2,
    marginVertical: 4,
    padding: 10,
    marginTop: 10,
  },
  thankYou: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderCompleted: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  orderSummary: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderSummaryContent: {
    flexDirection: 'row',
  },
  orderSummaryLeftContent: {
    width: '40%',
    color: '#000',
  },
  orderSummaryRightContent: {
    width: '50%',
  },
  downloadIInvoice: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadInvoiceButton: {
    padding: 7,
    backgroundColor: '#183153',
    color: '#FFF',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    marginTop: 20,
  },
  shopMore: {
    padding: 7,
    backgroundColor: '#183153',
    color: '#FFF',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Invoice;
