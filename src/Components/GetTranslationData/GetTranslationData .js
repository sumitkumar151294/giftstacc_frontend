import { useSelector } from 'react-redux';

export const GetTranslationData = (resourceType, resourceKey) => {
  const translationData = [
    {
        "id": 6,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "email_label",
        "resourceValue": "Email",
        "lang": "en"
    },
    {
        "id": 7,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "email_placeholder",
        "resourceValue": "enter your email",
        "lang": "en"
    },
    {
        "id": 8,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "password_label",
        "resourceValue": "Password",
        "lang": "en"
    },
    {
        "id": 9,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "password_placeholder",
        "resourceValue": "enter your password",
        "lang": "en"
    },
    {
        "id": 10,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "sign",
        "resourceValue": "Sign into your account",
        "lang": "en"
    },
    {
        "id": 11,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "req_field",
        "resourceValue": "All the * fields are required.",
        "lang": "en"
    },
    {
        "id": 12,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "remember",
        "resourceValue": "Remember my preference",
        "lang": "en"
    },
    {
        "id": 13,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "sign_me",
        "resourceValue": "Sign In Me",
        "lang": "en"
    },
    {
        "id": 16,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "client_master_label",
        "resourceValue": "Client Master",
        "lang": "en"
    },
    {
        "id": 17,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "contact_Name_label",
        "resourceValue": "Contact Name",
        "lang": "en"
    },
    {
        "id": 18,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "contact_Number_label",
        "resourceValue": "Contact Number",
        "lang": "en"
    },
    {
        "id": 19,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "IP Address_label",
        "resourceValue": " Database IP Address",
        "lang": "en"
    },
    {
        "id": 20,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "usernamee_label",
        "resourceValue": "Username",
        "lang": "en"
    },
    {
        "id": 21,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "password_label",
        "resourceValue": "Password",
        "lang": "en"
    },
    {
        "id": 22,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Status_label",
        "resourceValue": "Status",
        "lang": "en"
    },
    {
        "id": 23,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Color_label",
        "resourceValue": "Color",
        "lang": "en"
    },
    {
        "id": 24,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Logo Link_label",
        "resourceValue": "Logo Link",
        "lang": "en"
    },
    {
        "id": 25,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Select Theme_label",
        "resourceValue": "Select Theme",
        "lang": "en"
    },
    {
        "id": 26,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "razorpay Payment Gateway_label",
        "resourceValue": "Razorpay Payment Gateway",
        "lang": "en"
    },
    {
        "id": 27,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "staging_label",
        "resourceValue": "Staging",
        "lang": "en"
    },
    {
        "id": 28,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "key_placeholder",
        "resourceValue": "Key",
        "lang": "en"
    },
    {
        "id": 29,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "secretkey_placeholder",
        "resourceValue": "Secret Key",
        "lang": "en"
    },
    {
        "id": 30,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "production_key_label",
        "resourceValue": "Production",
        "lang": "en"
    },
    {
        "id": 31,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "add_label",
        "resourceValue": "Add",
        "lang": "en"
    },
    {
        "id": 32,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "client List_label",
        "resourceValue": "Client List",
        "lang": "en"
    },
    {
        "id": 33,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "search_here_label",
        "resourceValue": "Search here......",
        "lang": "en"
    },
    {
        "id": 34,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "export_label",
        "resourceValue": "export",
        "lang": "en"
    },
    {
        "id": 35,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "client ID_label",
        "resourceValue": "Client ID",
        "lang": "en"
    },
    {
        "id": 36,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "action_label",
        "resourceValue": "Action",
        "lang": "en"
    },
    {
        "id": 37,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "login_label",
        "resourceValue": "Login",
        "lang": "en"
    },
    {
        "id": 38,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "brands_label",
        "resourceValue": "Brands",
        "lang": "en"
    },
    {
        "id": 39,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "action_label",
        "resourceValue": "Action",
        "lang": "en"
    },
    {
        "id": 40,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "contact_Email_label",
        "resourceValue": "Contact Email",
        "lang": "en"
    },
    {
        "id": 41,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "select_Option",
        "resourceValue": "Selected Option:",
        "lang": "en"
    },
    {
        "id": 42,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "technical_issue",
        "resourceValue": "We have some technical issue",
        "lang": "en"
    },
    {
        "id": 43,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "contact_Admin",
        "resourceValue": "Please check in sometime or contact administrator",
        "lang": "en"
    },
    {
        "id": 44,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "invalid_Email",
        "resourceValue": "Invalid email address",
        "lang": "en"
    },
    {
        "id": 45,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "user_Master_label",
        "resourceValue": "User Master",
        "lang": "en"
    },
    {
        "id": 46,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "User_list_label",
        "resourceValue": "User list",
        "lang": "en"
    },
    {
        "id": 47,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "mobile_label",
        "resourceValue": "Mobile",
        "lang": "en"
    },
    {
        "id": 48,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role_label",
        "resourceValue": "Role",
        "lang": "en"
    },
    {
        "id": 49,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "client_label",
        "resourceValue": "Client",
        "lang": "en"
    },
    {
        "id": 50,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "required_label",
        "resourceValue": "All the * fields are required.",
        "lang": "en"
    },
    {
        "id": 51,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "submit_label",
        "resourceValue": "Submit",
        "lang": "en"
    },
    {
        "id": 52,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role_name_label",
        "resourceValue": "Role Name",
        "lang": "en"
    },
    {
        "id": 53,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clients_name_label",
        "resourceValue": "Clients",
        "lang": "en"
    },
    {
        "id": 54,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "update_label",
        "resourceValue": "Update",
        "lang": "en"
    },
    {
        "id": 55,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "number_Digit_Label",
        "resourceValue": "Please enter 10 digit only",
        "lang": "en"
    },
    {
        "id": 56,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "number_Digit_Label",
        "resourceValue": "Please enter 10 digit only",
        "lang": "en"
    },
    {
        "id": 57,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "RoleMaster",
        "resourceValue": "ROle Master",
        "lang": "en"
    },
    {
        "id": 58,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role-master",
        "resourceValue": "Role Master",
        "lang": "en"
    },
    {
        "id": 59,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role-name",
        "resourceValue": "Role Name",
        "lang": "en"
    },
    {
        "id": 60,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "select-all",
        "resourceValue": "SelectAll",
        "lang": "en"
    },
    {
        "id": 61,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "selectall",
        "resourceValue": "Select All",
        "lang": "en"
    },
    {
        "id": 62,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "module-access",
        "resourceValue": "Module Access",
        "lang": "en"
    },
    {
        "id": 63,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role-module-access-list",
        "resourceValue": "Role Module Access List",
        "lang": "en"
    },
    {
        "id": 64,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "first-name",
        "resourceValue": "First Name",
        "lang": "en"
    },
    {
        "id": 65,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "last-name",
        "resourceValue": "Last Name",
        "lang": "en"
    },
    {
        "id": 66,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "modules",
        "resourceValue": "Modules",
        "lang": "en"
    },
    {
        "id": 67,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "action",
        "resourceValue": "Action",
        "lang": "en"
    },
    {
        "id": 68,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "submit",
        "resourceValue": "Submit",
        "lang": "en"
    },
    {
        "id": 69,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierMaster",
        "resourceValue": "Supplier Master",
        "lang": "en"
    },
    {
        "id": 70,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierName",
        "resourceValue": "Supplier Name",
        "lang": "en"
    },
    {
        "id": 71,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierClientID",
        "resourceValue": "Supplier Client ID",
        "lang": "en"
    },
    {
        "id": 72,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierClientSecret",
        "resourceValue": "Supplier Client Secret",
        "lang": "en"
    },
    {
        "id": 73,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "endPoint",
        "resourceValue": "End Point ",
        "lang": "en"
    },
    {
        "id": 74,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "select",
        "resourceValue": "Select",
        "lang": "en"
    },
    {
        "id": 75,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "active",
        "resourceValue": "Active",
        "lang": "en"
    },
    {
        "id": 76,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "nonActive",
        "resourceValue": "Non-Active",
        "lang": "en"
    },
    {
        "id": 77,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "authorizationCode ",
        "resourceValue": "Authorization Code",
        "lang": "en"
    },
    {
        "id": 78,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "minThresholdAmount",
        "resourceValue": "Min. Threshold Amount",
        "lang": "en"
    },
    {
        "id": 79,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierList",
        "resourceValue": "Supplier List",
        "lang": "en"
    },
    {
        "id": 80,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplier_Master_Label",
        "resourceValue": "Supplier Master",
        "lang": "en"
    },
    {
        "id": 81,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Supplier_name_Label",
        "resourceValue": "Supplier Name",
        "lang": "en"
    },
    {
        "id": 82,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplier_Client_Label",
        "resourceValue": "Supplier Client ID",
        "lang": "en"
    },
    {
        "id": 83,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Supplier_Client_Secret_Label",
        "resourceValue": "Supplier Client Secret",
        "lang": "en"
    },
    {
        "id": 84,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "End_Point_Label",
        "resourceValue": "End Point",
        "lang": "en"
    },
    {
        "id": 85,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Authorization_Code_Label",
        "resourceValue": "Authorization Code",
        "lang": "en"
    },
    {
        "id": 86,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Min._Threshold_Amount_Label",
        "resourceValue": "Min. Threshold Amount",
        "lang": "en"
    },
    {
        "id": 87,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Supplier_List_Label",
        "resourceValue": "Supplier List",
        "lang": "en"
    },
    {
        "id": 88,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierBrands",
        "resourceValue": "Supplier Brands",
        "lang": "en"
    },
    {
        "id": 89,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "selectSuppliers",
        "resourceValue": "Select Suppliers",
        "lang": "en"
    },
    {
        "id": 90,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "all",
        "resourceValue": "All",
        "lang": "en"
    },
    {
        "id": 91,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierBrandLists",
        "resourceValue": "Supplier Brand Lists",
        "lang": "en"
    },
    {
        "id": 92,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "id",
        "resourceValue": "ID",
        "lang": "en"
    },
    {
        "id": 93,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "brands",
        "resourceValue": "Brands",
        "lang": "en"
    },
    {
        "id": 94,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierMargin",
        "resourceValue": "Supplier Margin%",
        "lang": "en"
    },
    {
        "id": 95,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "createUpdateBrandMapping",
        "resourceValue": "Create And Update & Brand Mapping",
        "lang": "en"
    },
    {
        "id": 96,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "categoryName",
        "resourceValue": "Category Name",
        "lang": "en"
    },
    {
        "id": 97,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplierBrand",
        "resourceValue": "Supplier Brand",
        "lang": "en"
    },
    {
        "id": 98,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "selectStatus",
        "resourceValue": "Select Status",
        "lang": "en"
    },
    {
        "id": 99,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "logout",
        "resourceValue": "Logout",
        "lang": "en"
    },
    {
        "id": 100,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "inActive",
        "resourceValue": "In-Active",
        "lang": "en"
    },
    {
        "id": 101,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "categories",
        "resourceValue": "Categories",
        "lang": "en"
    },
    {
        "id": 103,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "products",
        "resourceValue": "Products",
        "lang": "en"
    },
    {
        "id": 104,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "customers",
        "resourceValue": "Customers",
        "lang": "en"
    },
    {
        "id": 105,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "orders",
        "resourceValue": "Orders",
        "lang": "en"
    },
    {
        "id": 106,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "todayrevenue",
        "resourceValue": "Today’s Revenue",
        "lang": "en"
    },
    {
        "id": 107,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "activeuser",
        "resourceValue": "Active User's",
        "lang": "en"
    },
    {
        "id": 108,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "months",
        "resourceValue": "Monthly",
        "lang": "en"
    },
    {
        "id": 109,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "daily",
        "resourceValue": "Daily",
        "lang": "en"
    },
    {
        "id": 110,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "today",
        "resourceValue": "Today",
        "lang": "en"
    },
    {
        "id": 111,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "field_Name_Label",
        "resourceValue": "Field Name",
        "lang": "en"
    },
    {
        "id": 112,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "field_Value_Label",
        "resourceValue": "Field Value",
        "lang": "en"
    },
    {
        "id": 113,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "mode_Label",
        "resourceValue": "Mode",
        "lang": "en"
    },
    {
        "id": 114,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "database_User_ID_Label",
        "resourceValue": "Database User ID",
        "lang": "en"
    },
    {
        "id": 115,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "database_User_Pass_Label",
        "resourceValue": " Database User Password",
        "lang": "en"
    },
    {
        "id": 116,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "categoryList",
        "resourceValue": "Category List",
        "lang": "en"
    },
    {
        "id": 117,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Theme Details_Label",
        "resourceValue": " Theme Details",
        "lang": "en"
    },
    {
        "id": 118,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": " Database Credentials_Label",
        "resourceValue": "Database Credentials",
        "lang": "en"
    },
    {
        "id": 119,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Theme_Details_Label",
        "resourceValue": " Theme Details",
        "lang": "en"
    },
    {
        "id": 120,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": " Database_Credentials_Label",
        "resourceValue": "Database_Credentials",
        "lang": "en"
    },
    {
        "id": 121,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Theme_Details_Label",
        "resourceValue": " Theme Details",
        "lang": "en"
    },
    {
        "id": 122,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": " Database_Credentials_Label",
        "resourceValue": "Database Credentials",
        "lang": "en"
    },
    {
        "id": 123,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "Theme_Details_Label",
        "resourceValue": " Theme Details",
        "lang": "en"
    },
    {
        "id": 124,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": " Database_Label",
        "resourceValue": "Database Credentials",
        "lang": "en"
    },
    {
        "id": 125,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "heading",
        "resourceValue": "Brand Catalogue",
        "lang": "en"
    },
    {
        "id": 127,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "headingbrandcatalogue",
        "resourceValue": "Brand Catalogue",
        "lang": "en"
    },
    {
        "id": 128,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "brandname1",
        "resourceValue": "Amazon",
        "lang": "en"
    },
    {
        "id": 129,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "image",
        "resourceValue": "Image",
        "lang": "en"
    },
    {
        "id": 130,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "sku",
        "resourceValue": "SKU",
        "lang": "en"
    },
    {
        "id": 131,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "name",
        "resourceValue": "Name",
        "lang": "en"
    },
    {
        "id": 132,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "minprice",
        "resourceValue": "Min Price",
        "lang": "en"
    },
    {
        "id": 133,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "maxprice",
        "resourceValue": "Max Price",
        "lang": "en"
    },
    {
        "id": 134,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "price",
        "resourceValue": "Price",
        "lang": "en"
    },
    {
        "id": 135,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "type",
        "resourceValue": "Type",
        "lang": "en"
    },
    {
        "id": 136,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "pricerange",
        "resourceValue": "Price Range",
        "lang": "en"
    },
    {
        "id": 137,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "pricedenominations",
        "resourceValue": "Price Denominations",
        "lang": "en"
    },
    {
        "id": 138,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "termsandconditions",
        "resourceValue": "*Terms and Conditions",
        "lang": "en"
    },
    {
        "id": 139,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "storelocator",
        "resourceValue": "*Store Locator",
        "lang": "en"
    },
    {
        "id": 140,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplier",
        "resourceValue": "Supplier",
        "lang": "en"
    },
    {
        "id": 141,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "client",
        "resourceValue": "Client",
        "lang": "en"
    },
    {
        "id": 142,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "date",
        "resourceValue": "Date Range With Time",
        "lang": "en"
    },
    {
        "id": 143,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "ordersupplier",
        "resourceValue": "Supplier",
        "lang": "en"
    },
    {
        "id": 144,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "orderbrand",
        "resourceValue": "Brand",
        "lang": "en"
    },
    {
        "id": 145,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "ordervouchers",
        "resourceValue": "Total No. Vouchers",
        "lang": "en"
    },
    {
        "id": 146,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "orderamount",
        "resourceValue": "Total Order Amount",
        "lang": "en"
    },
    {
        "id": 147,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "ordermargin",
        "resourceValue": "Margin",
        "lang": "en"
    },
    {
        "id": 148,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "ordermarginvalue",
        "resourceValue": "Total Margin Value",
        "lang": "en"
    },
    {
        "id": 149,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "no_record_found",
        "resourceValue": "No Record Found",
        "lang": "en"
    },
    {
        "id": 150,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "no_record",
        "resourceValue": "No Record Found",
        "lang": "en"
    },
    {
        "id": 151,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "no_record_available",
        "resourceValue": "Record not available",
        "lang": "en"
    },
    {
        "id": 152,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorders",
        "resourceValue": "Failed Orders",
        "lang": "en"
    },
    {
        "id": 153,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "required-field",
        "resourceValue": "*",
        "lang": "en"
    },
    {
        "id": 154,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "checkbox_error",
        "resourceValue": "At least one module must be selected.",
        "lang": "en"
    },
    {
        "id": 155,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "brand_Detail_Label",
        "resourceValue": "Detail",
        "lang": "en"
    },
    {
        "id": 156,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "brand_Detail",
        "resourceValue": "Brand Detail",
        "lang": "en"
    },
    {
        "id": 157,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "UIAdmin",
        "resourceValue": "(Admin)",
        "lang": "en"
    },
    {
        "id": 158,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "admin_Label",
        "resourceValue": "Admin",
        "lang": "en"
    },
    {
        "id": 159,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersid",
        "resourceValue": "Order ID",
        "lang": "en"
    },
    {
        "id": 160,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersname",
        "resourceValue": "Name",
        "lang": "en"
    },
    {
        "id": 161,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersemail",
        "resourceValue": "Email",
        "lang": "en"
    },
    {
        "id": 162,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersmobile",
        "resourceValue": "Mobile",
        "lang": "en"
    },
    {
        "id": 163,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderscartvalue",
        "resourceValue": "Total Cart Value",
        "lang": "en"
    },
    {
        "id": 164,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersorderstatus",
        "resourceValue": "Order Status",
        "lang": "en"
    },
    {
        "id": 165,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersdate",
        "resourceValue": "Date of Order",
        "lang": "en"
    },
    {
        "id": 166,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersorderamount",
        "resourceValue": "Total Order Amount",
        "lang": "en"
    },
    {
        "id": 167,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderspaymentid",
        "resourceValue": "Payment ID",
        "lang": "en"
    },
    {
        "id": 168,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "balance_Available",
        "resourceValue": "Balance Available Amount",
        "lang": "en"
    },
    {
        "id": 169,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderspoints",
        "resourceValue": "Points Redeemed",
        "lang": "en"
    },
    {
        "id": 170,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderspaidamount",
        "resourceValue": "Paid Amount",
        "lang": "en"
    },
    {
        "id": 171,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderssno",
        "resourceValue": "S.NO",
        "lang": "en"
    },
    {
        "id": 172,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplier_API",
        "resourceValue": "Supplier API Details",
        "lang": "en"
    },
    {
        "id": 173,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersbrandname",
        "resourceValue": "Brand Name",
        "lang": "en"
    },
    {
        "id": 174,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersfacevalue",
        "resourceValue": "Face Value",
        "lang": "en"
    },
    {
        "id": 175,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersqty",
        "resourceValue": "QTY",
        "lang": "en"
    },
    {
        "id": 176,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderssku",
        "resourceValue": "SKU",
        "lang": "en"
    },
    {
        "id": 177,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "add_More",
        "resourceValue": "Add More",
        "lang": "en"
    },
    {
        "id": 178,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersdisamount",
        "resourceValue": "Discounted Amt.",
        "lang": "en"
    },
    {
        "id": 179,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderssuborderid",
        "resourceValue": "Suborder ID",
        "lang": "en"
    },
    {
        "id": 180,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersreferenceid",
        "resourceValue": "Reference ID",
        "lang": "en"
    },
    {
        "id": 181,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedorderssuborderstatus",
        "resourceValue": "Sub-Order Status",
        "lang": "en"
    },
    {
        "id": 182,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "failedordersamount",
        "resourceValue": "Amount",
        "lang": "en"
    },
    {
        "id": 183,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "delete",
        "resourceValue": "Delete",
        "lang": "en"
    },
    {
        "id": 184,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "delete_Button",
        "resourceValue": "Delete",
        "lang": "en"
    },
    {
        "id": 185,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "is_Client_role",
        "resourceValue": "Is Client Role",
        "lang": "en"
    },
    {
        "id": 186,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "customerlist",
        "resourceValue": "Customer List",
        "lang": "en"
    },
    {
        "id": 187,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "customerlistname",
        "resourceValue": "Name",
        "lang": "en"
    },
    {
        "id": 188,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "customerlistemail",
        "resourceValue": "Email",
        "lang": "en"
    },
    {
        "id": 189,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "customerlistphone",
        "resourceValue": "Phone",
        "lang": "en"
    },
    {
        "id": 190,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "customerlistjoined",
        "resourceValue": "Joined",
        "lang": "en"
    },
    {
        "id": 191,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmaster",
        "resourceValue": "Email Event Master",
        "lang": "en"
    },
    {
        "id": 192,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmastername",
        "resourceValue": "Event Name",
        "lang": "en"
    },
    {
        "id": 193,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmastersms",
        "resourceValue": "SMS Body",
        "lang": "en"
    },
    {
        "id": 194,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmastersubject",
        "resourceValue": "Subject",
        "lang": "en"
    },
    {
        "id": 195,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmastermail",
        "resourceValue": "Mail Body",
        "lang": "en"
    },
    {
        "id": 196,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmasterkeywords",
        "resourceValue": "Keywords",
        "lang": "en"
    },
    {
        "id": 197,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmastersno",
        "resourceValue": "S.NO",
        "lang": "en"
    },
    {
        "id": 198,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmasteraction",
        "resourceValue": "Action",
        "lang": "en"
    },
    {
        "id": 199,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "emaileventmasterdate",
        "resourceValue": "Date",
        "lang": "en"
    },
    {
        "id": 200,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role_Create_Label",
        "resourceValue": "Role created successfully",
        "lang": "en"
    },
    {
        "id": 201,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role_Updated_Label",
        "resourceValue": "Role updated successfully",
        "lang": "en"
    },
    {
        "id": 202,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "graph_Data_Label",
        "resourceValue": "Graph data is based on full system manners",
        "lang": "en"
    },
    {
        "id": 203,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "day_Label",
        "resourceValue": "than last day",
        "lang": "en"
    },
    {
        "id": 204,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "role_Req_Label",
        "resourceValue": "Role Name is required.",
        "lang": "en"
    },
    {
        "id": 205,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "category_deleted",
        "resourceValue": "Category Deleted Successfully",
        "lang": "en"
    },
    {
        "id": 206,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "not_Found",
        "resourceValue": "Not Found",
        "lang": "en"
    },
    {
        "id": 207,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "select_role",
        "resourceValue": "Please select a role",
        "lang": "en"
    },
    {
        "id": 208,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "select_Client",
        "resourceValue": "Please select a client",
        "lang": "en"
    },
    {
        "id": 209,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "supplier_products",
        "resourceValue": "Supplier Products",
        "lang": "en"
    },
    {
        "id": 210,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "field_Required",
        "resourceValue": "This field is required",
        "lang": "en"
    },
    {
        "id": 211,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "error_Occurred",
        "resourceValue": "An error occurred",
        "lang": "en"
    },
    {
        "id": 212,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlist",
        "resourceValue": "Client Brand List",
        "lang": "en"
    },
    {
        "id": 213,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistheading",
        "resourceValue": "Supplier Brand (Filter)",
        "lang": "en"
    },
    {
        "id": 214,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistname",
        "resourceValue": "Supplier Name",
        "lang": "en"
    },
    {
        "id": 215,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistbrandname",
        "resourceValue": "Supplier Brand Name",
        "lang": "en"
    },
    {
        "id": 216,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistdiscount",
        "resourceValue": "Customer Discount%",
        "lang": "en"
    },
    {
        "id": 217,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistcommission",
        "resourceValue": "Client Commission%",
        "lang": "en"
    },
    {
        "id": 218,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistmargin",
        "resourceValue": "Supplier Margin%",
        "lang": "en"
    },
    {
        "id": 219,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "clientbrandlistaction",
        "resourceValue": "Action",
        "lang": "en"
    },
    {
        "id": 220,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "meaning",
        "resourceValue": "Meaning",
        "lang": "en"
    },
    {
        "id": 221,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "variable",
        "resourceValue": "Variable",
        "lang": "en"
    },
    {
        "id": 222,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "fieldNameNotEmpty",
        "resourceValue": "Field name cannot be empty",
        "lang": "en"
    },
    {
        "id": 223,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "fieldValueNotEmpty",
        "resourceValue": "Field value cannot be empty",
        "lang": "en"
    },
    {
        "id": 224,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "addedSuccessfully.",
        "resourceValue": "Added Successfully.",
        "lang": "en"
    },
    {
        "id": 225,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "updateSuccessfully",
        "resourceValue": "Update Successfully.",
        "lang": "en"
    },
    {
        "id": 226,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "addedSuccessfully",
        "resourceValue": "Added Successfully.",
        "lang": "en"
    },
    {
        "id": 227,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "footer_copyright",
        "resourceValue": "Copyright © CC 2023",
        "lang": "en"
    },
    {
        "id": 228,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "abandoned_Cart_Report",
        "resourceValue": "Abandoned Cart Report",
        "lang": "en"
    },
    {
        "id": 229,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "placeholder_Mobile_Email_Name",
        "resourceValue": "Mobile/Email/Name",
        "lang": "en"
    },
    {
        "id": 230,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "subtotal",
        "resourceValue": "Subtotal",
        "lang": "en"
    },
    {
        "id": 231,
        "clientId": 0,
        "resourceType": "UIAdmin",
        "resourceKey": "sign_Me_Label",
        "resourceValue": "Sign Me In",
        "lang": "en"
    }
]

  const value =
    translationData && Array.isArray(translationData)
      ? translationData.find(
          (item) =>
            item.clientId === 0 &&
            item.resourceType === resourceType &&
            item.resourceKey === resourceKey
        )?.resourceValue
      : "";

  return value;
};