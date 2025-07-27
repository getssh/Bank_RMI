
export async function getExchangeRates() {
  const res = await fetch("https://v6.exchangerate-api.com/v6/d04532827839c3dba540b88b/latest/USD");
  return res.json();
}