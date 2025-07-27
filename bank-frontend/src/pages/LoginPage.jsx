import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [accountNumber, setAccountNumber] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userInfo) => {
    setAccountNumber(userInfo.accountNumber);
    setRole(userInfo.role);
    localStorage.setItem("accountNumber", userInfo.accountNumber);
    localStorage.setItem("role", userInfo.role);
    navigate("/dashboard", { state: { accountNumber: userInfo.accountNumber, role: userInfo.role } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm onLogin={handleLogin} />
      <button
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}