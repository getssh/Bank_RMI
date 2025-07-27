import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-50 shadow">
      <div>
        <Link to="/dashboard" className="text-white font-bold text-xl mr-4">Bank App</Link>
        <Link to="/admin" className="text-gray-300 hover:text-white mr-4">Admin Panel</Link>
      </div>
      <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
    </nav>
  );
}