export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}
export function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}
export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}
export function round(value, decimals = 2) {
  return Number(value.toFixed(decimals));
}