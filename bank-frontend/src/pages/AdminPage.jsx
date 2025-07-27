import { useNavigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";
import Navbar from "../components/Navbar";

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar onLogout={() => navigate("/")} />
      <AdminPanel />
    </div>
  );
}