import { useState } from "react";
import { userSignup } from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username:"", email: "", password: ""     });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSignup(form);
      console.log("signup user data in frontend that is sent:" ,form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mt-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-green-500 w-full mt-3 p-2 text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
