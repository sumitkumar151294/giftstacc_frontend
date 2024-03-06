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
  userRoleApi: "/user-role",
  userRolePostApi: "/user-role",
  updateUserRoleApi: "/user-role",

  // user-role-module-access
  userRoleModuleAccess: "/user-role-module-access",
  userRolePostModuleAccess: "/user-role-module-access",

  //user-master
  userMasterApi: "/user",
  userMasterPostApi: "/user",
  userMasterUpdateApi: "/user",

  //supplier-master
  supplierMasterApi: "/supplier-master",
  postSupplierMasterApi: "/supplier-master",
  updateSupplierMasterApi: "/supplier-master",

  //supplierResource
  postSupplierResource: "/supplier-api-resource",
  getSupplierResource: "/supplier-api-resource",
  updateSupplierResource: "/supplier-api-resource",

  //supplier-brand-list
  supplierBrandListApi: "/product",
  updateSupplierBrandListApi: "/product",

  //client
  getClient: "/client-master",
  postClient: "/client-master",
  updateClient: "/client-master",

  //Client-payment-details
  postClientPayment: "/client-payment-gateway",
  getClientPayment: "/client-payment-gateway",
  updateClientPayment: "/client-payment-gateway",

  // create-category
  createCategory: "/category",
  getCategories: "/categories/all",
  createCategoryUpdate: "/category",

  //brand-catalogue
  brandCatalogue: "/brand-catalogue/all",


  //faq-Master
  getFaqMaster: "/faq-master",
  postFaqMaster: "/faq-master",
  updateFaqMaster: "/faq-master",

  //faq-category api
  getFaqCategory: '/faq-category',
  postFaqCategory: '/faq-category',
  updateFaqCategory: '/faq-category',

// add-special api
  add_special: 'add-special',

  //banner-master
  banner_master: "/banner-master",



  //CMS
  postCMS: "/cms",
  getCMS: "/cms",
  updateCMS: "/cms",

  //offer-master
  postOfferMaster: "/offer-master",
  getOfferMaster: "/offer-master",
  updateOfferMaster: "/offer-master",

};
export default API;
