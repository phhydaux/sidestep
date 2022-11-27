import React, { useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  
  const [userProfile, setUserProfile] = useState(null);

    

  return (
    <AuthenticatedUserContext.Provider value={{  userProfile, setUserProfile }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};