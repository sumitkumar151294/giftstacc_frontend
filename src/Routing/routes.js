import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
import SupplierMaster from "../Pages/SupplierMaster/SupplierMaster";
import Layout from "../Layout/Layout"
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/suppliermaster" element={<Layout Component={SupplierMaster} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
