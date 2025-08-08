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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const res = await createAccount(form);
      if (res) {
        setSuccess(true);
        onRegister && onRegister();
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl min-w-[350px] mx-auto my-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">Account created!</div>}
      <input className="block w-full mb-2 p-2 border rounded" name="username" placeholder="Username" value={form.username} onChange={handleChange} required disabled={isLoading} />
      <input className="block w-full mb-2 p-2 border rounded" name="name" placeholder="Name" value={form.name} onChange={handleChange} required disabled={isLoading} />
      <input className="block w-full mb-2 p-2 border rounded" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required disabled={isLoading} />
      <select className="block w-full mb-2 p-2 border rounded" name="accountType" value={form.accountType} onChange={handleChange} required disabled={isLoading}>
        <option value="" disabled>Select Account Type</option>
        <option value="savings">Savings</option>
        <option value="business">Business</option>
      </select>
      <select className="block w-full mb-2 p-2 border rounded" name="role" value={form.role} onChange={handleChange} required disabled={isLoading}>
        <option value="" disabled>Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input className="block w-full mb-2 p-2 border rounded" name="pin" placeholder="PIN" type="password" value={form.pin} onChange={handleChange} required disabled={isLoading} />
      <input className="block w-full mb-4 p-2 border rounded" name="initialBalance" placeholder="Initial Balance" type="number" value={form.initialBalance} onChange={handleChange} required disabled={isLoading} />
      <button 
        className={`w-full text-white py-2 rounded flex items-center justify-center ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700'
        }`} 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </>
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
}