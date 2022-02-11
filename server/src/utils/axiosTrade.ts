import axios from 'axios';
const  axiosInstance = axios.create({
  timeout: 1000 * 30,
  baseURL: 'https://api.binance.com/',
})
export default axiosInstance;
