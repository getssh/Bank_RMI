import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const accountNumber = location.state?.accountNumber || localStorage.getItem("accountNumber");
  const role = location.state?.role || localStorage.getItem("role");
  
  if (!accountNumber) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <Navbar onLogout={() => navigate("/")} />
      <Dashboard accountNumber={accountNumber} />
    </div>
  );
}