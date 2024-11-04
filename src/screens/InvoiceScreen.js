import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {getInvoice} from '../api/Invoice/Invoice';

import Loader from '../components/Loader/loader';
import Invoice from '../components/Invoice/Invoice';

const InvoiceScreen = ({route, navigation}) => {
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    sleep();

    getInvoice(route.params.InvoiceId)
      .then(data => {
        setInvoiceData(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [route.params?.InvoiceId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : (
        <Invoice invoiceData={invoiceData} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default InvoiceScreen;
