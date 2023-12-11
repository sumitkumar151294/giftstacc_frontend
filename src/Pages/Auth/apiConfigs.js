const apiConfigs = [
  {
    API_URL: process.env.REACT_APP_ADMIN_API_URL,
    ACCESS_KEY: process.env.REACT_APP_ADMIN_ACCESS_KEY,
    SECRET_KEY: process.env.REACT_APP_ADMIN_SECRET_KEY,
    CLIENT_KEY: process.env.REACT_APP_ADMIN_CLIENT_KEY,
    PARTNER_KEY: process.env.REACT_APP_ADMIN_PARTNER_KEY,
  },
  {
    API_URL: process.env.REACT_APP_USER_API_URL,
    ACCESS_KEY: process.env.REACT_APP_USER_ACCESS_KEY,
    SECRET_KEY: process.env.REACT_APP_USER_SECRET_KEY,
    CLIENT_KEY: process.env.REACT_APP_USER_CLIENT_KEY,
    PARTNER_KEY: process.env.REACT_APP_USER_PARTNER_KEY,
  },
    ];

export default apiConfigs;
