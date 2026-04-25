import { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {

  // ✅ Safe initial token load
  const getInitialToken = () => {
    const stored = localStorage.getItem("JWT_TOKEN");

    // basic validation (JWT should be string with dots)
    if (stored && stored.includes(".")) {
      return stored;
    }
    return null;
  };

  const [token, setToken] = useState(getInitialToken);

  // ✅ Sync with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("JWT_TOKEN", token);
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  }, [token]);

  // ✅ helper methods (clean usage everywhere)
  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const sendData = {
    token,
    setToken, // keep if needed
    login,
    logout,
  };

  return (
    <ContextApi.Provider value={sendData}>
      {children}
    </ContextApi.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);

  // ✅ safety check
  if (!context) {
    throw new Error("useStoreContext must be used inside ContextProvider");
  }

  return context;
};