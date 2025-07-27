const API_URL = "http://localhost:8080/api/bank";

export async function login(username, pin) {
  const params = new URLSearchParams({ username, pin });
  const res = await fetch(`${API_URL}/login?${params}`, { method: "POST" });
  return res.json();
}

export async function createAccount(data) {
  const params = new URLSearchParams(data);
  const res = await fetch(`${API_URL}/createAccount?${params}`, { method: "POST" });
  return res.json();
}

export async function getBalance(accountNumber) {
  const res = await fetch(`${API_URL}/balance?accountNumber=${accountNumber}`);
  return res.json();
}

export async function deposit(accountNumber, amount) {
  const res = await fetch(`${API_URL}/deposit?accountNumber=${accountNumber}&amount=${amount}`, { method: "POST" });
  return res.json();
}

export async function withdraw(accountNumber, amount) {
  const res = await fetch(`${API_URL}/withdraw?accountNumber=${accountNumber}&amount=${amount}`, { method: "POST" });
  return res.json();
}

export async function transfer(fromAccount, toAccount, amount) {
  const res = await fetch(`${API_URL}/transfer?fromAccount=${fromAccount}&toAccount=${toAccount}&amount=${amount}`, { method: "POST" });
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