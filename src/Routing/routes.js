import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
import Layout from '../Layout/Layout'
import Orders from "../Pages/Orders/Orders";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Lc-admin/orders" element={<Layout Component={Orders} />} />
        
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
