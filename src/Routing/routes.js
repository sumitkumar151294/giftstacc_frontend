import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ClientMaster from "../Pages/ClientMaster/ClientMaster";
import LoginPage from "../Pages/Loginform/LoginPage"
import Layout from "../Layout/Layout";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Lc-admin/clientMaster" element={<Layout Component={ClientMaster} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
