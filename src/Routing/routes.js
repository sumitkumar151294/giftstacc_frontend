import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
import Layout from "../Layout/Layout";
import SupplierBrandList from "../Pages/SupplierBrandList/SupplierBrandList";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/supplierbrandlist" element={<Layout Component={SupplierBrandList} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
