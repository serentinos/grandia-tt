import axios from 'axios'

const BASE_URL = 'https://api.api-ninjas.com/v1';
const API_KEY = 'lApYI9n8PDUu6G8AQRpSrA==jOtl1X4CJvk92Uo7';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  }
})

type RequestMethod = 'GET' | 'POST';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  options.headers = {
    'X-Api-Key': 'iXHDtK+qYgF60C1TzwOyFw==bSIv8oEWAq2yNbTj',
  };

  if (data) {
    options.body = data;
  }

  console.log(options);

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.message);
      });
    }

    return response.json();
  });
}

export const clientTest = {
  get: <T>(url: string) => request<T>(url),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, data?: any) => request<T>(url, 'POST', data),
};