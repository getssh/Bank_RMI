import { useEffect, useState } from "react";
import { getAllUsers, getAllTransactions } from "../api/bankApi";
import ServerTime from "./ServerTime";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
    getAllTransactions().then(setTransactions);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Link to="/dashboard" className="text-blue-600 underline hover:text-blue-800">Go to Dashboard</Link>
      </div>
      <ServerTime />
      <div className="mb-8">
        <h3 className="font-semibold mb-2">All Users</h3>
        <table className="w-full text-left mb-4">
          <thead>
            <tr>
              <th className="border-b p-2">Account #</th>
              <th className="border-b p-2">Username</th>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Phone</th>
              <th className="border-b p-2">Type</th>
              <th className="border-b p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? users.map((u, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-blue-50" : ""}>
                <td className="p-2">{u.account_number || "-"}</td>
                <td className="p-2">{u.username || "-"}</td>
                <td className="p-2">{u.name || "-"}</td>
                <td className="p-2">{u.phone || "-"}</td>
                <td className="p-2">{u.account_type || "-"}</td>
                <td className="p-2">{u.role || "-"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-2 text-gray-400">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="font-semibold mb-2">All Transactions</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b p-2">Date</th>
              <th className="border-b p-2">Type</th>
              <th className="border-b p-2">Amount</th>
              <th className="border-b p-2">From</th>
              <th className="border-b p-2">To</th>
              <th className="border-b p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? transactions.map((tx, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-blue-50" : ""}>
                <td className="p-2">{tx.date || tx.timestamp || "-"}</td>
                <td className="p-2">{tx.type || "-"}</td>
                <td className="p-2">{tx.amount || "-"}</td>
                <td className="p-2">{tx.account_number || "-"}</td>
                <td className="p-2">{tx.target_account || "-"}</td>
                <td className="p-2">{tx.details || "-"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-2 text-gray-400">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}