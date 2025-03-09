import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/dashboard" className="text-lg font-semibold">Event Planner</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="bg-gray-500 px-3 py-2 rounded">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="bg-green-500 px-3 py-2 rounded">Register</Link>
            <Link to="/login" className="bg-blue-500 px-3 py-2 rounded">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
