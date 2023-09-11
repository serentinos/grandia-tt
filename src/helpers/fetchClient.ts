import axios from 'axios'

const BASE_URL = 'https://api.api-ninjas.com/v1';
const API_KEY = 'lApYI9n8PDUu6G8AQRpSrA==jOtl1X4CJvk92Uo7';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  }
})
