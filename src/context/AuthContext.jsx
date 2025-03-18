import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchUserDetails } from "../api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
     

      fetchUserDetails(decoded.id)
        .then((userdata) => {
          
          if (!userdata || !userdata.role) {
            console.error("Error: Role is missing in user data");
            return;
          }

          setUser({
            ...userdata,
            token,  
            purchasedCourses: userdata.purchasedCourses || [],
          });
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
          localStorage.removeItem("token");  
        });
    }
  }, []);

  const login = async (userData) => {
    if (userData?.token) {
      const decoded = jwtDecode(userData.token);
      localStorage.setItem("token", userData.token);
 
      try {
        const userdata = await fetchUserDetails(decoded.id);
 
        if (!userdata || !userdata.role) {
          console.error("Error: User role is missing");
          return;
        }

        setUser({
          ...userdata,
          token: userData.token, 
          purchasedCourses: userdata.purchasedCourses || [],
        });
      } catch (error) {
        console.error("Error during login:", error);
      }
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
