import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from '../Layout/Layout';
import LoginPage from "../Pages/Loginform/LoginPage";
import Usermaster from '../Pages/UserMaster/UserMaster'

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Lc-admin/usermaster" element={<Layout Component={Usermaster} />} />
        <Route path="/usermaster" element={<Usermaster />} />

        

      </Routes>
    </Router>
  );
}

export default RouteConfiq;
