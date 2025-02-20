// lib/currencyConverter.ts
import { cache } from 'react';

const getExchangeRate = cache(async () => {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/USD`
    );
    const data = await response.json();
    if (!data.rates?.INR) {
      console.error('INR rate not found in exchange rate data.');
      return null;
    }
    return data.rates.INR;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
});

export const convertUsdToInr = cache(async (usdAmount: number) => {
  const exchangeRate = await getExchangeRate();

  if (exchangeRate === null) {
    return null;
  }

  return usdAmount * exchangeRate;
});
