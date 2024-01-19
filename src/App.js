import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AbandonedCartReport from "./Pages/AbandonedCart/AbandonedCart";
import Layout from "./Layout/Layout";
import './scss/index.scss'
import FailedOrders from "./Pages/FailedOrders/FailedOrders";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lc-admin/abandoned-cart-report" element={<Layout Component={AbandonedCartReport} />} />
        <Route path="/lc-admin/failed-orders" element={<Layout Component={FailedOrders} />} />
      </Routes>
    </Router>
  );
}
export default App;