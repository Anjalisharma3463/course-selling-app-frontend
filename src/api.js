import axios from "axios";

const API = axios.create({
  baseURL: "https://course-selling-app-backend-ljls.onrender.com/api",
  
});
 
export const adminSignup = (data) => API.post("/admin/signup", data);
export const adminLogin = (data) => API.post("/admin/login", data);
export const createCourse = (data, token) =>
  API.post("/admin/courses", data, {
    headers: { Authorization: `Bearer ${token}` },
  });


  export const getCourses = () => API.get("/admin/courses");
 
export const userSignup = (data) => API.post("/user/signup", data);
export const userLogin = (data) => API.post("/user/login", data);


export const purchaseCourse = async (courseId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error(" No token found! User might not be logged in.");
    return;
  }

  try {
    const response = await API.post(`user/courses/${courseId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("  Error purchasing course:", error.response?.data || error.message);
    throw error;
  }
};


  export const getPurchasedCourses = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found! User might not be logged in.");
      return;
    }

    return API.get("/user/purchasedCourses", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };


  export const fetchUserDetails = async (userId) => {
    try {
      console.log("fetchuserdetails called");
      
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("  No token found! User might not be logged in.");
        return null;
      }
  
      const response = await API.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
        console.log("response is sent by api fetchusedatlsL: ",response.data)
      return response.data;  
    } catch (error) {
      console.error(" Failed to fetch user details:", error.response?.data || error.message);
      return null;  
    }
  };
  