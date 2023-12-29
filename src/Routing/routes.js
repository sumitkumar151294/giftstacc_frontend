import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout"
import LoginPage from "../Pages/Login/LoginPage";
import SupplierMaster from "../Pages/SupplierMaster/SupplierMaster";
import SupplierBrandList from "../Pages/SupplierBrandList/SupplierBrandList";
import UserMaster from "../Pages/UserMaster/UserMaster";
import CreateCategories from "../Pages/CreateCategories/CreateCategories";
import ClientMaster from "../Pages/ClientMaster/ClientMaster";
import HomePage from "../Components/HomePage/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BrandCatalogue from "../Pages/BrandCatalogue/BrandCatalogue";
import BrandDetail from "../Pages/BrandDetail/BrandDetail";
import Orders from "../Pages/Orders/Orders";
import ClientBrandList from "../Pages/ClientMaster/ClientBrandList/ClientBrandList";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList/RoleMasterList";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lc-admin/login" element={<LoginPage />} />
        <Route path="/lc-user-admin/login" element={<LoginPage />} />
        <Route path="/lc-admin/dashboard" element={<Layout Component={Dashboard} />} />
        <Route path="/lc-admin/supplier-master" element={<Layout Component={SupplierMaster} />} />
        <Route path="/lc-admin/supplier-product-list" element={<Layout Component={SupplierBrandList} />} />
        <Route path="/lc-admin/create-categories" element={<Layout Component={CreateCategories} />} />
        <Route path="/lc-admin/role-master" element={<Layout Component={RoleMasterList} />} />
        <Route path="/lc-admin/client-master" element={<Layout Component={ClientMaster} />} />
        <Route path="/lc-admin/client-brand-list" element={<Layout Component={ClientBrandList} />} />
        <Route path="/lc-admin/user-master" element={<Layout Component={UserMaster} />} />
        <Route path="/lc-admin/brand-catalogue" element={<Layout Component={BrandCatalogue} />} />
        <Route path="/lc-admin/brand-detail" element={<Layout Component={BrandDetail} />} />
        <Route path="/lc-admin/orders" element={<Layout Component={Orders} />} />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;