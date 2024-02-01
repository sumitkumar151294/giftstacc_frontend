import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
    "client-code": sessionStorage.getItem('clientCode'),
    "partner-code": "UIAdmin",
  },
});

export default api;