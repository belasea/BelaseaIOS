import React, {createContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = createContext();

export const NetworkProvider = ({children}) => {
  const [isInternet, setInternet] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setInternet(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{isInternet}}>
      {children}
    </NetworkContext.Provider>
  );
};
