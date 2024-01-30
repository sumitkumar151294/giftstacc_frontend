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
var url = "https://localhost:7284/api";
if(window.location.href.includes('http://localhost:3000'))
url= "https://localhost:7284/api"
const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
