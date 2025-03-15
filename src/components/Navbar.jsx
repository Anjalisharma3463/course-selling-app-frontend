import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Correct import

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is undefined. Ensure AuthProvider wraps the component tree.");
    return null;
  }

  const { user, logout } = authContext; // ✅ Use AuthContext correctly
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Redirect to home page after logout
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div>

      <Link to="/" className="text-xl font-bold">Course App</Link>
      <Link to="/" className="text-sm  font-bold"> Home</Link>
       {user ? (
         <Link to="/purchased-courses" className="text-sm bg-[#37538d] rounded-sm p-1 ml-2 font-bold" > Your Purchased Courses</Link>

       ) : (null)}
      
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username || "User"}</span> {/* ✅ Display actual user name */}
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
