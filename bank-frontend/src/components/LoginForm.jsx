import { useState } from "react";
import { login } from "../api/bankApi";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, pin);
    if (result.success) {
      onLogin(result);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl min-w-[350px] mx-auto my-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        className="block w-full mb-2 p-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="block w-full mb-4 p-2 border rounded"
        placeholder="PIN"
        type="password"
        value={pin}
        onChange={e => setPin(e.target.value)}
        required
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
        Login
      </button>
    </form>
  );
}