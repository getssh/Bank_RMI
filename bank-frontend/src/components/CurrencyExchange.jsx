import { useEffect, useState } from "react";
import { getExchangeRates } from "../api/exchangeApi";

export default function CurrencyExchange() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("ETB");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExchangeRates().then(data => {
      setRates(data.conversion_rates || {});
      setLoading(false);
    });
  }, []);

  const handleConvert = () => {
    if (rates[from] && rates[to]) {
      const usdAmount = amount / rates[from];
      setResult((usdAmount * rates[to]).toFixed(4));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-xs ml-8">
      <h3 className="font-bold text-lg mb-2">Currency Exchange</h3>
      {loading ? (
        <div>Loading rates...</div>
      ) : (
        <>
          <div className="mb-2">
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={amount}
              min={0}
              onChange={e => setAmount(Number(e.target.value))}
              placeholder="Amount"
            />
          </div>
          <div className="flex mb-2">
            <select
              className="border p-2 rounded mr-2 flex-1"
              value={from}
              onChange={e => setFrom(e.target.value)}
            >
              {Object.keys(rates).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
            <span className="self-center">→</span>
            <select
              className="border p-2 rounded ml-2 flex-1"
              value={to}
              onChange={e => setTo(e.target.value)}
            >
              {Object.keys(rates).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleConvert}
          >
            Convert
          </button>
          {result && (
            <div className="mt-3 text-center font-semibold">
              {amount} {from} = {result} {to}
            </div>
          )}
        </>
      )}
    </div>
  );
}