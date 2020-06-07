import axios from 'axios';

export async function fetchService() {
  const response = await axios.get(
    'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
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
