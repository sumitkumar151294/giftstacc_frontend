import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
import CreateCategories from "../Pages/CreateCategories/CreateCategories";
import Layout from "../../src/Layout/Layout"
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/createcategories" element={<Layout Component={CreateCategories} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
