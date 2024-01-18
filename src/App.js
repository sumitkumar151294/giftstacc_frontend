

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './scss/index.scss';
import MainHomePage from "./Pages/Enduser/MainHomepage/MainHomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomePage />} />

      </Routes>
    </Router>
  );
}
export default App;