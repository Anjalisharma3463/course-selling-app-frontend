import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is undefined. Ensure AuthProvider wraps the component tree.");
    return null;
  }

  const { user, logout } = authContext;  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");  
  };

  return (
    <nav className="inset-0 sticky bg-gray-900 text-white p-4 flex justify-between">
      <div> 

      <Link to="/" className="text-xl font-bold">Coursify</Link>
      <Link to="/" className="text-sm bg-[#37538d] rounded-sm p-1 ml-2 font-bold"> Home</Link>
      
      {user ? (   
  user.role === "student" ? (
    <Link to="/purchased-courses" className="text-sm bg-[#37538d] rounded-sm p-1 ml-2 font-bold">
      Your Purchased Courses
    </Link>
  ) : user.role === "admin" ? (
    <>
      <Link to="/admin/yourcreatedcourses" className="text-sm bg-[#37538d] rounded-sm p-1 ml-2 font-bold">
        Your Created Courses
      </Link>
      <Link to="/admin/dashboard" className="text-sm bg-[#37538d] rounded-sm p-1 ml-2 font-bold">
        Create A New Course
      </Link>
    </>
  ) : null
) : null} 

      
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username || "User"}</span>  

            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-500 px-3 py-1 rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
