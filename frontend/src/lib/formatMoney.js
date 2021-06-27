const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

export default function formatMoney(price) {
  return formatter.format(price);
}
