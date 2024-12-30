import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = props => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Load saved totalQuantity from AsyncStorage
  useEffect(() => {
    const loadTotalQuantity = async () => {
      try {
        const savedQuantity = await AsyncStorage.getItem('totalQuantity');
        if (savedQuantity !== null) {
          setTotalQuantity(parseInt(savedQuantity, 10));
        }
      } catch (error) {
        console.error('Failed to load totalQuantity:', error);
      }
    };
    loadTotalQuantity();
  }, []);

  // Save totalQuantity to AsyncStorage whenever it changes
  useEffect(() => {
    const saveTotalQuantity = async () => {
      try {
        await AsyncStorage.setItem('totalQuantity', totalQuantity.toString());
      } catch (error) {
        console.error('Failed to save totalQuantity:', error);
      }
    };
    saveTotalQuantity();
  }, [totalQuantity]);

  return (
    <CartContext.Provider
      value={{
        totalQuantity,
        setTotalQuantity,
      }}>
      {props.children}
    </CartContext.Provider>
  );
};
