const API = {
  //login
  loginAuth: "/generate-auth-token",
  loginApi: "/login",

  //translation
  translationApi: "/translation-content-get-by-clientid",

  //module-master
  moduleApi: "/module-master",

  //use-role
  userRoleApi: "/user-role",
  updateUserRoleApi: "/user-role/update",

  // user-role-module-access
  userRoleModuleAccess: "/user-role-module-access",

  //user-master
  userMasterApi: "/user/all",
  userMasterUpdateApi: "/user/update",

  //supplier-master
  supplierMasterApi: "/supplier-master",
  postSupplierMasterApi: "/create-supplierMaster",
  updateSupplierMasterApi: "/create-supplierMaster",

  //supplier-brand-list
  supplierBrandListApi: "/supplier-brand-list/all",

  getClient: "/client-master",
  postClient: "/create-clientMaster",
  updateClient: "/client-master/update",

  // create-category
  createCategory: "/category",
  getCategories: "/categories/all",
  createCategoryUpdate: "/category",

  //brand-catalogue
  brandCatalogue: "/brand-catalogue/all",
};
export default API;
