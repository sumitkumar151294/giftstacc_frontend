import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from '../Layout/Layout';
import LoginPage from "../Pages/Loginform/LoginPage";
import UserMaster from '../Pages/UserMaster/UserMaster';

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Lc-admin/usermaster" element={<Layout Component={UserMaster} />} />
        <Route path="/usermaster" element={<UserMaster />} />

        

      </Routes>
    </Router>
  );
}

export default RouteConfiq;
