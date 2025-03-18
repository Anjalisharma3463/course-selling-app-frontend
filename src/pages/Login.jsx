import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
 
import { useNavigate } from "react-router-dom";
import {userLogin} from "../api.js";
const Login = () => {
  const [form, setForm] = useState({ username: "", password: "", role:"student" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const { data } = await userLogin(form);
   
      login(data); 
      if(data.role === "admin"){
        navigate("/admin/dashboard")
      }
      else{

        navigate("/purchased-courses");
      }
    } catch (err) {
      console.error("Login Error:", err?.response?.data || err.message);
      alert("Invalid credentials!");
    }
  };
  
  

  
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="username"
          placeholder="username"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mt-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
         
        <select
  className="w-full p-2 mt-2 border rounded-lg mb-3 bg-gray-100"
  value={form.role}
  onChange={(e) => setForm({ ...form, role: e.target.value })}
>
  <option value="" disabled>Select Role</option>
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>
        
        <button className="bg-blue-500 w-full mt-3 p-2 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
