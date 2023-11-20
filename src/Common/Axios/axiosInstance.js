import axios from 'axios';
export default axios.create({
  baseURL: 'https://localhost:7284/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
