import axios from 'axios';

export async function fetchService() {
  const response = await axios.get(
    process.env['REACT_APP_API_ADDRESS'] as string
  );

  return response;
}
