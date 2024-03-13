const API = {
  //login
  loginAuth: "/generate-auth-token",
  loginApi: "/login",
  // client login
  clientLogin: '/login',
  //translation
  translationApi: "/translation-content-get-by-clientid",
  //module-master
  moduleApi: "/module-master",
  //use-role
  user_role: "/user-role",
  // user-role-module-access
  userRole_moduleAccess: "/user-role-module-access",
  //user-master
  user_master: "/user",
  //supplier-master
  supplier_master: "/supplier-master",
  //supplierResource
  supplier_resource: "/supplier-api-resource",
  //supplier-brand-list
  supplier_brandList: "/product",
  //client
  client_master: "/client-master",
  //Client-payment-details
  clientPayment_gateway: "/client-payment-gateway",
  // create-category
  create_category: "/category",
  getAll_categories: "/categories/all",
  //brand-catalogue
  getAll_brands: "/brand-catalogue/all",
  //faq-Master
  faq_master: "/faq-master",
  //faq-category api
  faq_category: '/faq-category',
  // add-special api
  add_special: 'add-special',
  //banner-master
  banner_master: "/banner-master",
  //CMS
  cms_api: "/cms",
  //offer-master
  offer_master: "/offer-master",
  //client-product-mapping
  client_product_mapping:"/client-product-mapping-by-client-Id",
  client_product_map:"/client-product-mapping"

};
export default API;
