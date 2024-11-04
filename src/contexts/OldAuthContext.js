import React, {createContext, useEffect, useContext, useState} from 'react';

export const AuthContext = createContext();

// third party
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, bela} from '../api/api';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const [mainLoader, setMainLoader] = useState(false);

  useEffect(() => {
    async function tokenVerification() {
      setMainLoader(true);
      const store_token = await AsyncStorage.getItem('@store_token_key');

      if (store_token !== null) {
        setIsAuthenticate(true);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let raw = JSON.stringify({
          token: store_token,
        });

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}/account/api/token-verify/`, requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.status) {
              setIsAuthenticate(true);
              setUser(data.user);
              // setMainLoader(false)
            } else {
              setIsAuthenticate(false);
              setUser({});
              // setMainLoader(false)
            }
          })
          .catch(error => {
            setIsAuthenticate(false);
            setUser({});
          });
      }
    }

    tokenVerification().then(() => {
      setMainLoader(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticate,
        setIsAuthenticate,
        mainLoader,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
