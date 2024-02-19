import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoginPage from "../Pages/Login/LoginPage";
import HomePage from "../Components/HomePage/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BrandCatalogue from "../Pages/BrandCatalogue/BrandCatalogue";
import BrandDetail from "../Pages/BrandDetail/BrandDetail";
import Orders from "../Pages/Orders/Orders";
import ClientBrandList from "../Pages/ClientMaster/ClientBrandList";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList";
import ClientMasterList from "../Pages/ClientMaster/ClientMasterList";
import CategoryList from "../Pages/CreateCategories/CategoryList";
import UserMasterList from "../Pages/UserMaster/UserMasterList";
import SupplierMasterList from "../Pages/SupplierMaster/SupplierMasterList";
import SupplierProductList from "../Pages/SupplierProductList/SupplierProductList";
import PageError from "../Components/PageError/PageError";
import CMS from "../Pages/ClientAdmin/CMS/CMS";
// import SupplierProductList from "../Pages/SupplierProductList/SupplierProductList";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/lc-user-admin/login" element={<LoginPage />} />
        <Route
          path="/lc-admin/dashboard"
          element={<Layout Component={Dashboard} />}
        />
         <Route
          path="/lc-user-Admin/dashboard"
          element={<Layout Component={Dashboard} />}
        />
        <Route
          path="/lc-admin/supplier-master"
          element={<Layout Component={SupplierMasterList} />}
        />
        <Route
          path="/lc-admin/supplier-product-list"
          element={<Layout Component={SupplierProductList} />}
        />
        <Route
          path="/lc-admin/create-categories"
          element={<Layout Component={CategoryList} />}
        />
        <Route
          path="/lc-admin/role-master"
          element={<Layout Component={RoleMasterList} />}
        />
        <Route
          path="/lc-admin/client-master"
          element={<Layout Component={ClientMasterList} />}
        />
        <Route
          path="/lc-admin/client-brand-list"
          element={<Layout Component={ClientBrandList} />}
        />
        <Route
          path="/lc-admin/user-master"
          element={<Layout Component={UserMasterList} />}
        />
        <Route  
          path="/lc-user-Admin/brand-catalogue"
          element={<Layout Component={BrandCatalogue} />}
        />
        <Route
          path="/lc-user-Admin/brand-detail"
          element={<Layout Component={BrandDetail} />}
        />
        <Route
          path="/lc-admin/orders"
          element={<Layout Component={Orders} />}
        />
        <Route
          path="/lc-user-admin/cms"
          element={<Layout Component={CMS} />}
        />
         <Route
          path="*"
          element={<PageError pageError={{StatusCode:"404", ErrorName:"Route not found", ErrorDesription:"The page you were looking for is not found!", url:"/", buttonText:"Back to home" }}/>}
        />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
