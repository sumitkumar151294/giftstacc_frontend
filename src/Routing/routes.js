import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
import  Layout from '../Layout/Layout'
import BrandCatalogue from "../Pages/BrandCatalogue/BrandCatalogue";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Lc-admin/brandcatalogue" element={<Layout Component={BrandCatalogue} />} />
        <Route path="/LC-admin/productdetail" element={<Layout Component={ProductDetail} />} />

      </Routes>
    </Router>
  );
}

export default RouteConfiq;
