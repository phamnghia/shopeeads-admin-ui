import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 30000
});

export default Axios;