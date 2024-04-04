/* eslint-disable react-hooks/exhaustive-deps */
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
  const [supplierBrandListData, setSupplierBrandListData] = useState([]);
  const supplierBrandData = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const supplierMasterData = useSelector(
    (state) => state?.supplierMasterReducer?.data
  );
  // const getModules = useSelector((state) => state.moduleReducer);
  // const getModulesRoleId = getModules?.data;
  // const getRolesAccess = getModules?.filteredData;

  // const findRoleAccess = getRolesAccess.filte(r)
  // const supplierBrandListData = useSelector((state)=> state?.supplierBrandListReducer?.data);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    supplierId: "",
    supplierBrandId: "",
  });
  const [createCategory, setCreateCategory] = useState({
    supplierId: "",
    supplierBrandId: "",
    name: "",
  });
  const getCategoriesData = useSelector((state) => state.createCategoryReducer);
  const resetCategoryFields = {
    name: "",
    supplierId: "",
    supplierBrandId: "",
  };

  // To get the Supplier Brand from redux store

  useEffect(() => {
    dispatch(onGetSupplierList());
    dispatch(onGetSupplierBrandList({isCategory:true}));
  }, []);

  // To get the dropdown values of Supplier Name
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

  const handleChange = (e, fieldName) => {
    if (fieldName === "supplierId") {
      let supplierList = [];
      Array.isArray(supplierBrandData) &&
        supplierBrandData
          ?.filter((item) => {
            return (
              item.supplierCode ===
              e.target.selectedOptions.item("").getAttribute("name")
            );
          })
          .map((item) => {
            supplierList.push({ label: item.name, value: item.id });
          });
      setSupplierBrandListData(supplierList);
      setCreateCategory({
        ...createCategory,
        supplierBrandId: "",
        [fieldName]: e.target.value,
      });
    } else {
      setCreateCategory({
        ...createCategory,
        [fieldName]: e.target.value,
      });
    }
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    for (const key in createCategory) {
      if (createCategory[key] === "") {
        newErrors[key] = { field_Required };
        isValid = false;
      } else if (createCategory[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      }else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid) {
      try {
        dispatch(onPostCategory(createCategory));
        setIsLoading(true);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (getCategoriesData?.post_status_code === "500") {
      setIsFormLoading(false);
      toast.error(getCategoriesData?.postMessage);
      dispatch(onPostCategoryReset());
      dispatch(onGetCategory());
      setCreateCategory(resetCategoryFields);
    } else if (getCategoriesData.update_status_code === "201") {
      setIsFormLoading(false);
      toast.success(getCategoriesData?.updateMessage);
      dispatch(onUpdateCategoryReset());
      dispatch(onGetCategory());
      setCreateCategory(resetCategoryFields);
    } else if (getCategoriesData?.post_status_code === "201") {
      setIsFormLoading(false);
      toast.success(getCategoriesData?.postMessage);
      dispatch(onPostCategoryReset());
      dispatch(onGetCategory());
      setCreateCategory(resetCategoryFields);
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
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="categoryNam"
                            id="name-f"
                            placeholder=""
                            value={createCategory.name}
                            onChange={(e) => handleChange(e, "name")}
                          />
                          {<p className="text-danger">{errors.name}</p>}
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
                            value={createCategory.supplierId}
                            className={` ${
                              errors.supplierId
                                ? "border-danger"
                                : "form-select"
                            }`}
                            options={
                              Array.isArray(supplierMasterData)
                                ? supplierMasterData?.map((supplier) => ({
                                    label: supplier.name,
                                    value: supplier.id,
                                    data: supplier.code,
                                  }))
                                : []
                            }
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
                            value={createCategory.supplierBrandId}
                            ariaLabel="Select"
                            className={` ${
                              errors.supplierBrandId
                                ? "border-danger"
                                : "form-select"
                            }`}
                            options={supplierBrandListData}
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
/* eslint-enable react-hooks/exhaustive-deps */