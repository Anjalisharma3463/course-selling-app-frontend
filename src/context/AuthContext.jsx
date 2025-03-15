import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {fetchUserDetails} from "../api.js";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
       

  const login =  async (userData) => { 
    if (userData?.token) {
      const decoded = jwtDecode(userData.token);
      localStorage.setItem("token", userData.token);
      console.log("decoded userid", decoded.id);
       
      const userdata = await fetchUserDetails(decoded.id); // Fetch details after login
       console.log("userdata in loign",userdata);
       setUser(userdata)
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
