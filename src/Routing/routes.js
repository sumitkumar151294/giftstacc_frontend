import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BrandCatalogue from "../Pages/BrandCatalogue/BrandCatalogue";
import BrandDetail from "../Pages/BrandDetail/BrandDetail";
import Orders from "../Pages/Orders/Orders";
import EmailEventMaster from "../Pages/ClientAdmin/EmailEventMaster/EmailEventMaster";
import ClientBrandList from "../Pages/ClientMaster/ClientBrandList";
import ClientMasterList from "../Pages/ClientMaster/ClientMasterList";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList";
import CategoryList from "../Pages/CreateCategories/CategoryList";
import FailedOrders from "../Pages/FailedOrders/FailedOrders";
import UserMasterList from "../Pages/UserMaster/UserMasterList";
import SupplierMasterList from "../Pages/SupplierMaster/SupplierMasterList";
import AbandonedCartReport from "../Pages/AbandonedCart/AbandonedCart";
import SupplierProductList from "../Pages/SupplierProductList/SupplierProductList";
import PageError from "../Components/PageError/PageError";
import AddSpecialList from "../Pages/ClientAdmin/AddSpecial/AddSpecialList";
import AllocateBrand from "../Pages/ClientAdmin/AddSpecial/AllocateBrand";
import CMSList from "../Pages/ClientAdmin/CMS/CMSList";
import BannerMasterList from "../Pages/ClientAdmin/BannerMaster/BannerList";
import FaqMaster from "../Pages/ClientAdmin/FaqMaster/FaqMaster";
import OfferMasterList from "../Pages/ClientAdmin/OfferMaster/OfferMasterList";
import ClientCommissionReport from "../Pages/ClientAdmin/ClientCommissionReport/ClientCommissionReport";
import CustomerList from "../Pages/ClientAdmin/CustomerList/CustomerList";
import PromotionalList from  '../Pages/ClientAdmin/Promotional/PromotionalList'
import PromotionalAllocateBrand from "../Pages/ClientAdmin/Promotional/PromotionalAllocateBrand";
import UnlockPointsList from "../Pages/ClientAdmin/UnlockPoints/UnlockPointsList";
import ClientConfigurationList from "../Pages/clientConfiguration/clientConfigurationList";
import DashboardClient from "../Pages/Dashboard/Dashboard-client";

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/lc-admin/dashboard"
          element={<Layout Component={Dashboard} />}
        />
        <Route
          path="/lc-admin/supplier-master"
          element={<Layout Component={SupplierMasterList} />}
        />
        <Route
          path="/lc-admin/supplier-product-list"
          element={<Layout Component={SupplierProductList} />}
        />
        <Route
          path="/lc-admin/create-categories"
          element={<Layout Component={CategoryList} />}
        />
        <Route
          path="/lc-admin/role-master"
          element={<Layout Component={RoleMasterList} />}
        />
        <Route
          path="/lc-admin/client-master"
          element={<Layout Component={ClientMasterList} />}
        />
        <Route
          path="/lc-admin/client-brand-list"
          element={<Layout Component={ClientBrandList} />}
        />
        <Route
          path="/lc-admin/user-master"
          element={<Layout Component={UserMasterList} />}
        />
        <Route
          path="/lc-admin/brand-catalogue"
          element={<Layout Component={BrandCatalogue} />}
        />
        <Route
          path="/lc-admin/brand-detail"
          element={<Layout Component={BrandDetail} />}
        />
        <Route
          path="/lc-admin/orders"
          element={<Layout Component={Orders} />}
        />
        <Route
          path="/lc-admin/brandcatalouge"
          element={<Layout Component={BrandCatalogue} />}
        />
         <Route
          path="/lc-user-admin/promotional"
          element={<Layout Component={PromotionalList} />}
        />
        <Route path="/lc-user-admin/login" element={<LoginPage />} />
        <Route
          path="/lc-user-admin/dashboard"
          element={<Layout Component={DashboardClient} />}
        />
        <Route
          path="/lc-user-admin/orders"
          element={<Layout Component={Orders} />}
        />
        <Route
          path="/lc-user-admin/cms"
          element={<Layout Component={CMSList} />}
        />
        <Route
          path="/lc-user-admin/brand-catalouge"
          element={<Layout Component={BrandCatalogue} />}
        />
        <Route
          path="/lc-user-admin/brand-detail"
          element={<Layout Component={BrandDetail} />}
        />
        <Route
          path="/lc-user-admin/offer-master"
          element={<Layout Component={OfferMasterList} />}
        />
        <Route
          path="/lc-user-admin/customer-list"
          element={<Layout Component={CustomerList} />}
        />
        <Route
          path="/lc-user-admin/add-special"
          element={<Layout Component={AddSpecialList} />}
        />
        <Route
          path="/lc-user-admin/allocate-brand"
          element={<Layout Component={AllocateBrand} />}
        />
        <Route
          path="/lc-user-admin/promotional-allocate-brand"
          element={<Layout Component={PromotionalAllocateBrand} />}
        />
        <Route
          path="/lc-user-admin/faq"
          element={<Layout Component={FaqMaster} />}
        />
        <Route
          path="/lc-user-admin/banner-master"
          element={<Layout Component={BannerMasterList} />}
        />
        <Route
          path="/lc-user-admin/client-commission-report"
          element={<Layout Component={ClientCommissionReport} />}
        />
        <Route
          path="/lc-user-admin/email-event-master"
          element={<Layout Component={EmailEventMaster} />}
        />
        <Route
          path="/lc-user-admin/failed-orders"
          element={<Layout Component={FailedOrders} />}
        />
        <Route
          path="/lc-user-admin/abandoned-cart-report"
          element={<Layout Component={AbandonedCartReport} />}
        />
         <Route
          path="/lc-user-admin/clientConfiguration"
          element={<Layout Component={ClientConfigurationList} />}
        />
        <Route
          path="/lc-user-admin/unlockPoints"
          element={<Layout Component={UnlockPointsList} />}
        />
        <Route
          path="*"
          element={
            <PageError
              pageError={{
                StatusCode: "404",
                ErrorName: "Route not found",
                ErrorDesription: "The page you were looking for is not found!",
                url: "/",
                buttonText: "Back to home",
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
