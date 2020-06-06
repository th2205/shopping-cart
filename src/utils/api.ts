import axios from 'axios';

export async function fetchService() {
  const response = await axios.get(
    process.env['REACT_APP_API_ADDRESS'] as string
  );

  return response;
}

export async function getExchangeRate() {
  const response = await axios.get(
    'https://api.exchangeratesapi.io/latest?base=USD'
  );
  const exchangeRate = response.data.rates.KRW;

  return exchangeRate;
}
