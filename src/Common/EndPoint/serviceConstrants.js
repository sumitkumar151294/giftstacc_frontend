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
  userMasterApi: "/user",
  userMasterUpdateApi: "/user/update",

  //supplier-master 
  supplierMasterApi: "/supplier-master",
  updateSupplierMasterApi: "/supplier-master/update",

 //supplier-brand-list
  supplierBrandListApi: "/supplier-brand-list/all",

  getClient: "/client",
  postClient: "/client-master",
  updateClient: "/client-master/update",

  // create-category 
  createCategory: "/category",
  getCategories:"/categories/all",
  createCategoryUpdate:"/category",

  //brand-catalogue 
  brandCatalogue: "/brand-catalogue/all"

};
export default API;
