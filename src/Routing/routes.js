import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/loginForm";
import ClientMaster from "../Pages/ClientMaster/ClientMaster";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/clientMaster" element={<ClientMaster />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
