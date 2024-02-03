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
  // userRolePostApi:"/create-user",
  updateUserRoleApi: "/user-role/update",


  // user-role-module-access 
  userRoleModuleAccess: "/userRoleModuleAccess/all",
  userRolePostModuleAccess: "/user-role-module-access",

  //user-master
  userMasterApi: "/user/all",
  userPostMasterApi: "create-user",


  userMasterUpdateApi: "/user/update",

  //supplier-master
  supplierMasterApi: "/supplier-master",
  postSupplierMasterApi: "/supplier-master",
  updateSupplierMasterApi: "/supplier-master",

  //supplier-brand-list
  supplierBrandListApi: "/supplier-brand-list/all",

  getClient: "/client-master",
  postClient: "/client-master",
  updateClient: "/client-master",

  // create-category
  createCategory: "/category",
  getCategories: "/categories/all",
  createCategoryUpdate: "/category",

  //brand-catalogue
  brandCatalogue: "/brand-catalogue/all",
};
export default API;
