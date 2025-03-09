import { createContext, useState, useEffect } from "react";
import { fetchUser, loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetchUser()
        .then(setUser)
         .catch(() => logout());
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      console.log("Login Response:", data); 
      
      if (!data?.token) {
        console.error("Token not found in response");
        return;
      }
  
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
