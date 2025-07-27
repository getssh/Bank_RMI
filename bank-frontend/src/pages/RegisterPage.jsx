import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <RegisterForm onRegister={() => navigate("/")} />
      <button
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}