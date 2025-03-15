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
      <Link to="/" className="text-xl font-bold">Course App</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.name || "User"}</span> {/* ✅ Display actual user name */}
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
