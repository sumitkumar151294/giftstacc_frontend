import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginForm/loginForm";
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
