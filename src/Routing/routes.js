import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import Layout from "../Layout/Layout"
import LoginPage from "../Pages/Login/LoginPage";
import SupplierMaster from "../Pages/SupplierMaster/SupplierMaster";
import SupplierBrandList from "../Pages/SupplierBrandList/SupplierBrandList";
import UserMaster from "../Pages/UserMaster/UserMaster";
import CreateCategories from "../Pages/CreateCategories/CreateCategories";
import ClientMaster from "../Pages/ClientMaster/ClientMaster";
import HomePage from "../Componenets/HomePage/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BrandCatalogue from "../Pages/BrandCatalogue/BrandCatalogue";
import BrandDetail from "../Pages/BrandDetail/BrandDetail";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Lc-admin/login" element={<LoginPage />} />
        <Route path="/Lc-admin/dashboard" element={<Layout Component={Dashboard} />} />
        <Route path="/LC-admin/supplier-master" element={<Layout Component={SupplierMaster} />} />
        <Route path="/LC-admin/supplier-brand-list" element={<Layout Component={SupplierBrandList} />} />
        <Route path="/LC-admin/create-categories" element={<Layout Component={CreateCategories} />} />
        <Route path="/Lc-admin/role-master" element={<Layout Component={RoleMaster} />} />
        <Route path="/Lc-admin/client-master" element={<Layout Component={ClientMaster} />} />
        <Route path="/Lc-admin/user-master" element={<Layout Component={UserMaster} />} />
        <Route path="/Lc-admin/brand-catalogue" element={<Layout Component={BrandCatalogue} />} />
        <Route path="/Lc-admin/brand-detail" element={<Layout Component={BrandDetail} />} />

      </Routes>
    </Router>
  );
}
export default RouteConfiq;