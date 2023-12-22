import React, { useState } from "react";
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onPostCategory } from "../../../Store/Slices/createCategorySlice";
import InputField from "../../../Componenets/InputField/InputField";
import Dropdown from "../../../Componenets/Dropdown/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../../Componenets/ScrollToTop/ScrollToTop";


const BrandMapping = () => {
  const dispatch = useDispatch();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errors, setErrors] = useState({
    categoryName: "",
    supplierName: "",
    supplierBrand: "",
  });
  const [createCategory, setCreateCategory] = useState({
    categoryName: "",
    supplierName: "",
    supplierBrand: "",
  });
  const getMessage = useSelector(
    (state) => state.createCategoryReducer.message
  );

  // To get the supplier name from redux store 
  const getSupplierName = useSelector(
    (state) => state.supplierMasterReducer.data.data
  );

  // To get the dropdown values of Supplier Name
  const supplierNameOptions = getSupplierName?.map((supplier, index) => ({
    label: supplier.name,
    key: index
  }));

  // To get the Supplier Brand from redux store 
  const getSupplierBrand = useSelector(
    (state) => state.supplierBrandListReducer.data.data
  );
  // To get the dropdown values of Supplier Brands
  const supplierBrandOptions = getSupplierBrand?.map((supplierBrand, index) => ({
    label: supplierBrand.brands,
    key: index
  }));

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
        newErrors[key] = "This field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        await dispatch(onPostCategory(createCategory));
        toast.success(getMessage);
        setCreateCategory({
          categoryName: "",
          supplierName: "",
          supplierBrand: "",
        });
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setIsFormLoading(false);
      }
    } else {
      setIsFormLoading(false);
    }
  };

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title txt-admin txtt ">
                  {createUpdateBrandMapping}
                </h4>
              </div>

              <div className="card-body position-relative">
                {isFormLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container mt-3">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="name-f">
                            {categoryNameTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${errors.categoryName
                              ? "border-danger"
                              : "form-control"
                              }`}
                            name="categoryNam"
                            id="name-f"
                            placeholder=""
                            value={createCategory.categoryName}
                            onChange={(e) => handleChange(e, "categoryName")}
                          />
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="vendor-category">
                            {supplierNameLabelTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "supplierName")}
                            error={errors.supplierName}
                            ariaLabel="Select"
                            className={` ${errors.supplierName
                              ? "border-danger"
                              : "form-control"
                              }`}
                            options={supplierNameOptions}
                          />
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="vendor-category">
                            {supplierBrandTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "supplierBrand")}
                            error={errors.supplierBrand}
                            ariaLabel="Select"
                            className={` ${errors.supplierBrand
                              ? "border-danger"
                              : "form-control"
                              }`}
                            options={supplierBrandOptions}
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
                        <button
                          type="submit"
                          className="btn btn-primary float-right pad-aa"
                        >
                          {submitTranslation}{" "}
                          <i className="fa fa-arrow-right"></i>
                        </button>
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

export default BrandMapping;
