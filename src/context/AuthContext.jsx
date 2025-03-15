import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserDetails(decoded.id); // Fetch full user details
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for auth
        },
         
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Store full user details
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const login = (userData) => {
    if (userData?.token) {
      const decoded = jwtDecode(userData.token);
      localStorage.setItem("token", userData.token);
      console.log("decoded userid", decoded.id);
      
      fetchUserDetails(decoded.id); // Fetch details after login
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
