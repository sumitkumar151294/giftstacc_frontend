import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout"
import LoginPage from "../Pages/Login/LoginPage";
import HomePage from "../Components/HomePage/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList/RoleMasterList";
import Progress from "../Common/Progress/Progress";

// Define the configuration for routes
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lc-admin/login" element={<LoginPage />} />
        <Route path="/lc-user-admin/login" element={<LoginPage />} />
        <Route path="/lc-admin/dashboard" element={<Layout Component={Dashboard} />} />
        <Route path="/lc-admin/supplier-master" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/supplier-product-list" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/create-categories" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/role-master" element={<Layout Component={RoleMasterList} />} />
        <Route path="/lc-admin/client-master" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/client-brand-list" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/user-master" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/brand-catalogue" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/brand-detail" element={<Layout Component={Progress} />} />
        <Route path="/lc-admin/orders" element={<Layout Component={Progress} />} />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;