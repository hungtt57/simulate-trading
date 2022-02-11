import axios from 'axios';
const URL_WIKI = process.env.URL_WIKI;
const  axiosInstance = axios.create({
  timeout: 1000 * 30,
  baseURL: URL_WIKI,
})
export default axiosInstance;
