// import axios from "axios";
// var url = "https://giftstacc.way2webhost.com/api";
// if(window.location.href.includes('http://localhost:3000'))
// url= "https://giftstacc.way2webhost.com/api"
// const api = axios.create({
//   baseURL: url,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
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