import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from '../Pages/LoginForm/LoginForm'
import Layout from '../Layout/Layout';
import UserMaster from '../Pages/UserMaster/userMaster';

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Lc-admin/usermaster" element={<Layout Component={UserMaster} />} />

      </Routes>
    </Router>
  );
}

export default RouteConfiq;
