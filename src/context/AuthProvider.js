import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// create functional component
export const AuthProvider = ({ children }) => {
  // state for authorisation
  const [auth, setAuth] = useState(false);

  const login = () => {
    setAuth(true);
  };

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
