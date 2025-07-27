import { useState, useEffect } from "react";
import { getBalance } from "../api/bankApi";
import DepositWithdrawForm from "./DepositWithdrawForm";
import TransferForm from "./TransferForm";
import TransactionHistory from "./TransactionHistory";
import ServerTime from "./ServerTime";
import CurrencyExchange from "./CurrencyExchange";

export default function Dashboard({ accountNumber }) {
  const [balance, setBalance] = useState(null);
  const [transactionRefresh, setTransactionRefresh] = useState(0);

  const refreshBalance = async () => {
    const bal = await getBalance(accountNumber);
    setBalance(bal);
  };

  const refreshAll = () => {
    refreshBalance();
    setTransactionRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    refreshBalance();
  }, [accountNumber]);

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto mt-8">
      <div className="flex-1">
        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <ServerTime />
          <div className="mb-4 p-4 bg-blue-100 rounded">
            <span className="font-semibold">Account Number:</span> {accountNumber}
            <br />
            <span className="font-semibold">Balance:</span> {balance !== null ? `ETB ${balance}` : "Loading..."}
          </div>
          <DepositWithdrawForm accountNumber={accountNumber} onAction={refreshAll} />
          <TransferForm accountNumber={accountNumber} onAction={refreshAll} />
          <TransactionHistory accountNumber={accountNumber} refreshTrigger={transactionRefresh} />
        </div>
      </div>
      <div className="w-1/3">
        <CurrencyExchange />
      </div>
    </div>

  );
}