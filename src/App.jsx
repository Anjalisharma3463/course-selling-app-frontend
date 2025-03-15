import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
 
import AdminDashboard from "./pages/AdminDashboard";
  import Purchasedcourses from "./pages/Purchasedcourses";
 
  function App() {
  return (
 
      <Router>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
    
            <Route path="/purchased-courses" element={<Purchasedcourses  />} />
          </Routes>
        </div>
      </Router>
      
  );
}

export default App;



 