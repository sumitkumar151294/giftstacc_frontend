import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7284/api",
  headers: {
    "Content-Type": "application/json",
    // You can set the Authorization header here or include it dynamically when making requests
  },
});

// Add an interceptor to dynamically set the Authorization header before each request
api.interceptors.request.use(
  (config) => {
    debugger;
    // Retrieve the bearer token from where it's stored in your application (e.g., Redux state, local storage, etc.)
    const bearerToken = localStorage.getItem("jwt");

    // If the bearer token is available, set the Authorization header
    if (bearerToken) {
      config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
