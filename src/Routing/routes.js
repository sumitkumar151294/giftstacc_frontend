import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import Layout from "../Layout/Layout";
import LoginPage from "../Pages/LoginForm/LoginForm";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/rolemaster" element={<Layout Component={RoleMaster} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
