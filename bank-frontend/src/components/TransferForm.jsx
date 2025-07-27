import { useState } from "react";
import { transfer } from "../api/bankApi";

export default function TransferForm({ accountNumber, onAction }) {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async () => {
    const res = await transfer(accountNumber, toAccount, amount);
    setMessage(`Transferred ETB${amount} to account ${toAccount}. New balance: ETB${res.newBalance}`);
    setToAccount("");
    setAmount("");
    onAction && onAction();
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded">
      <h3 className="font-semibold mb-2">Transfer</h3>
      <input
        className="border p-2 rounded mr-2"
        type="number"
        placeholder="To Account"
        value={toAccount}
        onChange={e => setToAccount(e.target.value)}
      />
      <input
        className="border p-2 rounded mr-2"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleTransfer}>Transfer</button>
      {message && <div className="mt-2 text-blue-600">{message}</div>}
    </div>
  );
}