export const formatCurrency = (amount: number, currencyCode: string = 'INR') => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const getCurrencySymbol = (currencyCode: string = 'INR') => {
  return (0).toLocaleString(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).replace(/\d/g, '').trim();
};