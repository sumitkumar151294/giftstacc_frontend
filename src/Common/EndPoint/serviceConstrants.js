const API = {
  //login
  loginAuth: "/generate-auth-token",
  loginApi: "/login",
  // client login
  clientLogin: "/login",
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

  //product
  product_By_Id: "/products-by-client-id",

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
  faq_category: "/faq-category",
  // add-special api
  add_special: "add-special",
  //banner-master
  banner_master: "/banner-master",
  // promotional post /update
  promotional_api: "/promotionalStrip",
    // promotional get
    promotional_api_Get: "/promotional-strip-current-active",

  //prootional Allocate barnd
  promotional_Allocate_brand:"promotional-allocate-brands",
  promotional_Allocate_brand_by_promotionalId:"/promotional-allocate-brands-by-promotionalStrip-id",
  //CMS
  cms_api: "/cms",
  //offer-master
  offer_master: "/offer-master",
  //client-product-mapping
  client_product_mapping: "/client-product-mapping-by-client-Id",
  client_product_map: "/client-product-mapping",
  //allocate brand
  allocate_Brand: "/allocate-brands",
  //allocate brand by id

  allocate_Brand_Id: "/allocate-brands-by-addSpecial-id",

  //upload
  upload_Img: "/upload",
  //All productsapi
  getAllproduct:"/product/all"
};
export default API;
