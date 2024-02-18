import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetCategory,
  onPostCategory,
  onPostCategoryReset,
  onUpdateCategoryReset,
} from "../../Store/Slices/createCategorySlice";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { onGetSupplierBrandList } from "../../Store/Slices/supplierBrandListSlice";
import Button from "../../Components/Button/Button";

const CategoryForm = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const [supplierListData, setSupplierListData] = useState([]);
  const supplierBrandData = [
    {
id:"1",
name: "API SANDBOX B2B"
  }
]
  const supplierMasterData = useSelector(
    (state) => state?.supplierMasterReducer?.data
  );
  console.log(supplierMasterData, "supplierMasterData")
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errors, setErrors] = useState({

    name: "",
    supplierId: "",
    supplierBrandId: "",
  });
  const [createCategory, setCreateCategory] = useState({
    supplierId: 0,
    supplierBrandId: 0,
    name: "",
  });
  const getCategoriesData = useSelector(
    (state) => state.createCategoryReducer
  );
  const resetCategoryFields = {
    name: "",
    supplierId: "",
    supplierBrandId: "",
  };

  // To get the supplier name from redux store
  // useEffect(() => {
  //   dispatch(onGetSupplierList());
  // }, []);

  // To get the Supplier Brand from redux store

  useEffect(() => {
    dispatch(onGetSupplierList());
  }, []);
  
  useEffect(() => {
    let tempSupplier = [];
    Array.isArray(supplierMasterData) &&
      supplierMasterData?.map((item) => {
        tempSupplier.push({ label: item.name, value: item.id });
      });
    setSupplierListData(tempSupplier);
  }, [supplierMasterData]);

  // To get the dropdown values of Supplier Name

  // To get the dropdown values of Supplier Brands
  // const supplierBrandOptions = getSupplierBrand?.map(
  //   (supplierBrand, index) => ({
  //     label: supplierBrand.brands,
  //     key: index,
  //   })
  // );

  // To get the labels form Api/Database
  const createUpdateBrandMapping = GetTranslationData(
    "UIAdmin",
    "createUpdateBrandMapping"
  );
  const categoryNameTranslation = GetTranslationData("UIAdmin", "categoryName");
  const supplierNameLabelTranslation = GetTranslationData(
    "UIAdmin",
    "Supplier_name_Label"
  );
  const supplierBrandTranslation = GetTranslationData(
    "UIAdmin",
    "supplierBrand"
  );
  const requiredLabelTranslation = GetTranslationData(
    "UIAdmin",
    "required_label"
  );
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const field_Required = GetTranslationData("UIAdmin", "field_Required");
  const error_Occurred = GetTranslationData("UIAdmin", "error_Occurred");

  const handleChange = (e, fieldName) => {
    setCreateCategory({
      ...createCategory,
      [fieldName]: e.target.value,
    });

    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    let isValid = true;
    const newErrors = { ...errors };

    for (const key in createCategory) {
      if (createCategory[key] === "") {
        newErrors[key] = { field_Required };
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        setIsLoading(true);
        dispatch(onPostCategory(createCategory) );
      } catch (error) {
      }
    }
    
  };
useEffect(()=>{
if(getCategoriesData?.post_status_code === "201"){
  setIsFormLoading(false);
  toast.success(getCategoriesData?.postMessage);
  dispatch(onPostCategoryReset());
  dispatch(onGetCategory());
  setCreateCategory(resetCategoryFields);
}
},[getCategoriesData])

useEffect(()=>{
  if(getCategoriesData?.post_status_code === "500"){
    setIsFormLoading(false);
    toast.error(getCategoriesData?.postMessage);
    dispatch(onPostCategoryReset());
    dispatch(onGetCategory());
    setCreateCategory(resetCategoryFields);
  }
  },[getCategoriesData])

  useEffect(() => {
    if (getCategoriesData.update_status_code === "201") {
      setIsFormLoading(false);
      toast.success(getCategoriesData?.updateMessage);
      dispatch(onUpdateCategoryReset());
      dispatch(onGetCategory());
    }
  }, [getCategoriesData]);
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{createUpdateBrandMapping}</h4>
              </div>

              <div className="card-body">
                {isFormLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="name-f">
                            {categoryNameTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${errors.name
                                ? "border-danger"
                                : "form-control"
                              }`}
                            name="categoryNam"
                            id="name-f"
                            placeholder=""
                            value={createCategory.name}
                            onChange={(e) => handleChange(e, "name")}
                          />
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="vendor-category">
                            {supplierNameLabelTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "supplierId")}
                            error={errors.supplierId}
                            ariaLabel="Select"
                            className={` ${errors.supplierId
                                ? "border-danger"
                                : "form-select"
                              }`}
                              options={supplierListData}

                            // options={supplierMasterData.map((name) => ({value: name.id, label: name.name}))}
                          />
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="vendor-category">
                            {supplierBrandTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "supplierBrandId")}
                            error={errors.supplierBrandId}
                            ariaLabel="Select"
                            className={` ${errors.supplierBrandId
                                ? "border-danger"
                                : "form-select"
                              }`}
                            // options={supplierBrandData}
                            options={supplierBrandData.map((brand) => ({ value: brand.id, label: brand.name }))}
                          />
                        </div>
                      </div>
                      <span
                        className="form-check-label"
                        htmlFor="basic_checkbox_1"
                      >
                        {requiredLabelTranslation}
                      </span>
                      <div className="col-sm-4 mt-2 mb-4">
                        <Button
                          text={submitTranslation}
                          icon="fa fa-arrow-right"
                          className="btn btn-primary btn-sm float-right p-btn mt-2"
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
