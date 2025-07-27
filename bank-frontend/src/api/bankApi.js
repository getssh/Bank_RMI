const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/bank";

export async function login(username, pin) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, pin })
  });
  return res.json();
}

export async function createAccount(data) {
  const res = await fetch(`${API_URL}/createAccount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getBalance(accountNumber) {
  const res = await fetch(`${API_URL}/balance?accountNumber=${accountNumber}`);
  return res.json();
}

export async function deposit(accountNumber, amount) {
  const res = await fetch(`${API_URL}/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountNumber, amount })
  });
  return res.json();
}

export async function withdraw(accountNumber, amount) {
  const res = await fetch(`${API_URL}/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountNumber, amount })
  });
  return res.json();
}

export async function transfer(fromAccount, toAccount, amount) {
  const res = await fetch(`${API_URL}/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromAccount, toAccount, amount })
  });
  return res.json();
}

export async function getTransactionHistory(accountNumber) {
  const res = await fetch(`${API_URL}/transactions?accountNumber=${accountNumber}`);
  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API_URL}/admin/users`);
  return res.json();
}

export async function getAllTransactions() {
  const res = await fetch(`${API_URL}/admin/transactions`);
  return res.json();
}

export async function getServerTime() {
  const res = await fetch(`${API_URL}/time`);
  return res.json();
}