import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set user data
  const setUserContext = userData => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUserContext,
        isAuthenticated,
        setIsAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
