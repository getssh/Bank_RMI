import { useState } from "react";
import { createAccount } from "../api/bankApi";

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({
    username: "",
    name: "",
    phone: "",
    accountType: "",
    role: "",
    pin: "",
    initialBalance: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createAccount(form);
    if (res) {
      setSuccess(true);
      onRegister && onRegister();
    } else {
      setError("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl min-w-[350px] mx-auto my-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">Account created!</div>}
      <input className="block w-full mb-2 p-2 border rounded" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input className="block w-full mb-2 p-2 border rounded" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input className="block w-full mb-2 p-2 border rounded" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <select className="block w-full mb-2 p-2 border rounded" name="accountType" value={form.accountType} onChange={handleChange} required>
        <option value="" disabled>Select Account Type</option>
        <option value="savings">Savings</option>
        <option value="business">Business</option>
      </select>
      <select className="block w-full mb-2 p-2 border rounded" name="role" value={form.role} onChange={handleChange} required>
        <option value="" disabled>Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input className="block w-full mb-2 p-2 border rounded" name="pin" placeholder="PIN" type="password" value={form.pin} onChange={handleChange} required />
      <input className="block w-full mb-4 p-2 border rounded" name="initialBalance" placeholder="Initial Balance" type="number" value={form.initialBalance} onChange={handleChange} required />
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">
        Register
      </button>
    </form>
  );
}