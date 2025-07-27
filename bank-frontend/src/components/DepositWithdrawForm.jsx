import { useState } from "react";
import { deposit, withdraw } from "../api/bankApi";

export default function DepositWithdrawForm({ accountNumber, onAction }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async () => {
    const res = await deposit(accountNumber, amount);
    setMessage(`Deposited ETB${amount}. New balance: ETB${res.newBalance}`);
    setAmount("");
    onAction && onAction();
  };

  const handleWithdraw = async () => {
    const res = await withdraw(accountNumber, amount);
    setMessage(`Withdrew ETB${amount}. New balance: ETB${res.newBalance}`);
    setAmount("");
    onAction && onAction();
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded">
      <h3 className="font-semibold mb-2">Deposit / Withdraw</h3>
      <input
        className="border p-2 rounded mr-2"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={handleDeposit}>Deposit</button>
      <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={handleWithdraw}>Withdraw</button>
      {message && <div className="mt-2 text-blue-600">{message}</div>}
    </div>
  );
}