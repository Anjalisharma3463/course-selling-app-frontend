import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {userLogin} from "../api.js";
const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", form);

    try {
      const { data } = await userLogin(form);
      console.log("Login API Response:", data);

      login(data);



      

      navigate("/user/purchased-courses");
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
        <button className="bg-blue-500 w-full mt-3 p-2 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
