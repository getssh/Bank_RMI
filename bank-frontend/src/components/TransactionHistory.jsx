import { useEffect, useState } from "react";
import { getTransactionHistory } from "../api/bankApi";

export default function TransactionHistory({ accountNumber, refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTransactionHistory(accountNumber);
      setTransactions(data);
    }
    fetchData();
  }, [accountNumber, refreshTrigger]);

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="font-semibold mb-2">Transaction History</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Type</th>
            <th className="border-b p-2">Amount</th>
            <th className="border-b p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? transactions.map((tx, i) => (
            <tr key={i}>
              <td className="p-2">{tx.date || tx.timestamp || "-"}</td>
              <td className="p-2">{tx.type || "-"}</td>
              <td className="p-2">{tx.amount || "-"}</td>
              <td className="p-2">{tx.details || "-"}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4} className="p-2 text-gray-400">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}