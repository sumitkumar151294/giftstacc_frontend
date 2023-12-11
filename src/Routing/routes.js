import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import Layout from "../Layout/Layout"
import LoginPage from "../Pages/Login/LoginPage";
import SupplierMaster from "../Pages/SupplierMaster/SupplierMaster";
import SupplierBrandList from "../Pages/SupplierBrandList/SupplierBrandList";
import UserMaster from "../Pages/UserMaster/UserMaster";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/Lc-Admin/login" element={<LoginPage />} />
        <Route path="/Lc-admin/rolemaster" element={<Layout Component={RoleMaster} />} />
        <Route path="/Lc-admin/usermaster" element={<Layout Component={UserMaster} />} />
        <Route path="/LC-admin/suppliermaster" element={<Layout Component={SupplierMaster} />} />
        <Route path="/LC-admin/supplierbrandlist" element={<Layout Component={SupplierBrandList} />} />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
