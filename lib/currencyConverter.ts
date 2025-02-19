export const convertToINR = (priceInUSD: number): number => {
    const exchangeRate = Number(process.env.NEXT_PUBLIC_EXCHANGE_RATE) || 83; // Default exchange rate
    return Math.round(priceInUSD * exchangeRate);
  };
  