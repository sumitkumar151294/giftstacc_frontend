import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/loginForm";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
