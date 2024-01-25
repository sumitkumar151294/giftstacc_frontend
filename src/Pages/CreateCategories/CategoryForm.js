import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetCategory,
  onPostCategory,
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
  const resetCategoryFields = {
    categoryName: "",
    supplierName: "",
    supplierBrand: "",
  };

  // To get the supplier name from redux store
  // useEffect(() => {
  //   dispatch(onGetSupplierList());
  // }, []);

 
  // To get the Supplier Brand from redux store

  // useEffect(() => {
  //   dispatch(onGetSupplierBrandList());
  // }, []);

  const getSupplierBrand = useSelector(
    (state) => state.supplierBrandListReducer.data.data
  );

  const getSupplierName=[{
    name:"ankit",


  }]
  // To get the dropdown values of Supplier Name
  const supplierNameOptions = getSupplierName?.map((supplier, index) => ({
    label: supplier.name,
    key: index,
  }));

  // To get the dropdown values of Supplier Brands
  const supplierBrandOptions = getSupplierBrand?.map(
    (supplierBrand, index) => ({
      label: supplierBrand.brands,
      key: index,
    })
  );

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
        await dispatch(onPostCategory({
          enabled: true,
          deleted: true,
          createdBy: 0,
          updatedBy: 0,
          name: "ankit",
          url: "string3",
          description: "string3",
          image: "string3",
          thumbnail: "string3",
          vendorName: "string3"
        }));
        toast.success(getMessage);
        setCreateCategory(resetCategoryFields);
      } catch (error) {
        toast.error({ error_Occurred });
      } finally {
        setIsFormLoading(false);
      }
    } else {
      setIsFormLoading(false);
    }
    setTimeout(() => {
      dispatch(onGetCategory());
    }, 1000);
    setIsLoading(true);
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
                <h4 className="card-title">
                  {createUpdateBrandMapping}
                </h4>
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
                            className={` ${errors.categoryName ? "border-danger" : "form-control"}`}
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
                            className={` ${
                              errors.supplierName
                                ? "border-danger"
                                : "form-select"
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
                            className={` ${errors.supplierBrand? "border-danger" : "form-select" }`}
                            options={supplierNameOptions}
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
