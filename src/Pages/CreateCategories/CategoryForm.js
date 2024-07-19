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
import {
  onUploadImage,
  onUploadImageMobile,
  onUploadImageMobileReset,
  onUploadImageReset,
} from "../../Store/Slices/ClientAdmin/offerMasterSlice";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [Data, setData] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [webvisible, setwebVisible] = useState(false);
  const [supplierBrandListData, setSupplierBrandListData] = useState([]);
  const supplierBrandData = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const supplierMasterData = useSelector(
    (state) => state?.supplierMasterReducer?.data
  );
  const upload = GetTranslationData("UIClient", "upload");
  const upload_image = GetTranslationData("UIClient", "uploadImage");
  const [getImagePath, setGetImagePath] = useState("");
  const [getimagePhone, setGetImagePhone] = useState("");
  // const getModules = useSelector((state) => state.moduleReducer);
  // const getModulesRoleId = getModules?.data;
  // const getRolesAccess = getModules?.filteredData;

  // const findRoleAccess = getRolesAccess.filte(r)
  // const supplierBrandListData = useSelector((state)=> state?.supplierBrandListReducer?.data);

  const handleSelect = (name) => {
    setCreateCategory({
      ...createCategory,
      name,
    });

    setIsOpen(!isOpen);
  };
  const [errors, setErrors] = useState({
    name: "",
    supplierId: "",
    displayOrder: "",
    supplierBrandId: "",
  });
  const [createCategory, setCreateCategory] = useState({
    supplierId: "",
    supplierBrandId: "",
    name: "",
    image: false,
    mobileImage: false,
    displayOrder: "",
    displayHeader: false,
  });
  const offerMasterData = useSelector((state) => state.offerMasterReducer);

  const getCategoriesData = useSelector((state) => state.createCategoryReducer);
  const getSuppliermasterData = useSelector(
    (state) => state.supplierMasterReducer
  );
  const getSupplierBrandListLoadingData = useSelector(
    (state) => state.supplierBrandListReducer
  );
  const resetCategoryFields = {
    name: "",
    supplierId: "",
    supplierBrandId: "",
    image: false,
    displayOrder: "",
    displayHeader: false,
  };

  // To get the Supplier Brand from redux store

  useEffect(() => {
    dispatch(onGetSupplierList());
    dispatch(onGetSupplierBrandList({ isCategory: true }));
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
  const displayOrder = GetTranslationData("UIClient", "display-order");

  const supplierBrandTranslation = GetTranslationData(
    "UIAdmin",
    "supplierBrand"
  );
  const requiredLabelTranslation = GetTranslationData(
    "UIAdmin",
    "required_label"
  );
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const displayHeader = GetTranslationData("UIAdmin", "display_Header");

  const handleChange = (e, fieldName) => {
    const { type, checked, value } = e.target;
    if (type === "checkbox") {
      setCreateCategory({
        ...createCategory,
        displayHeader: checked,
      });
    } else if (fieldName === "image") {
      const file = e?.target?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData?.append("file", file);
        setGetImagePath(formData);
        setCreateCategory({
          ...createCategory,
          image: formData,
        });
      } else {
        e.target.value = "";
      }
    } else if (fieldName === "mobileImage") {
      const file = e?.target?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData?.append("file", file);
        setGetImagePhone(formData);
        setCreateCategory({
          ...createCategory,
          mobileImage: formData,
        });
      } else {
        e.target.value = "";
      }
    } else if (fieldName === "supplierId") {
      let supplierList = [];
      Array.isArray(supplierBrandData) &&
        supplierBrandData
          ?.filter((item) => {
            return (
              item.supplierCode ===
                e.target.selectedOptions.item("").getAttribute("name") &&
              item.enabled !== false
            );
          })
          .map((item) => {
            return supplierList.push({ label: item.name, value: item.id });
          });
      setSupplierBrandListData(supplierList);
      setCreateCategory({
        ...createCategory,
        supplierBrandId: "",
        [fieldName]: value,
      });
    } else if (fieldName === "name") {
      const filterData =
        Array.isArray(getCategoriesData?.categoryData) &&
        getCategoriesData?.categoryData?.filter((category) => {
          return (
            category.name &&
            category.name.toLowerCase().includes(value.toLowerCase())
          );
        });
      setData(value);
      setFilterData(filterData);
      setCreateCategory({
        ...createCategory,
        [fieldName]: value,
      });
    } else {
      setCreateCategory({
        ...createCategory,
        [fieldName]: value,
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
        newErrors[key] = " ";
        isValid = false;
      } else if (
        createCategory.supplierId === "Select" &&
        createCategory.supplierBrandId === ""
      ) {
        newErrors[key] = " ";
        isValid = false;
      } else if (createCategory[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid && createCategory.image) {
      dispatch(onUploadImage(getImagePath));
    }
    if (isValid && createCategory.mobileImage) {
      dispatch(onUploadImageMobile(getimagePhone));
    }
  };
  useEffect(() => {
    if(createCategory.image && createCategory.mobileImage){

      if (offerMasterData?.status_code_Image === "201" && offerMasterData?.status_code_MobileImage === "201") {
        try {
          dispatch(
            onPostCategory({
              ...createCategory,
              supplierId: parseInt(createCategory?.supplierId),
              supplierBrandId: parseInt(createCategory?.supplierBrandId),
              displayOrder: parseInt(createCategory?.displayOrder),
              image: offerMasterData?.imageUpload ,
              mobileImage: offerMasterData?.imageMobileUpload ,
            })
          );
        } catch (error) {}
      }
    }else if(createCategory.image && !createCategory.mobileImage){
      if (offerMasterData?.status_code_Image === "201") {
        try {
          dispatch(
            onPostCategory({
              ...createCategory,
              supplierId: parseInt(createCategory?.supplierId),
              supplierBrandId: parseInt(createCategory?.supplierBrandId),
              displayOrder: parseInt(createCategory?.displayOrder),
              image: offerMasterData?.imageUpload  ,
              mobileImage: offerMasterData?.imageMobileUpload ,
            })
          );
        } catch (error) {}
      }
    }
    else if(!createCategory.image && createCategory.mobileImage){
      if (offerMasterData?.status_code_MobileImage === "201") {
        try {
          dispatch(
            onPostCategory({
              ...createCategory,
              supplierId: parseInt(createCategory?.supplierId),
              supplierBrandId: parseInt(createCategory?.supplierBrandId),
              displayOrder: parseInt(createCategory?.displayOrder),
              image: offerMasterData?.imageUpload  ,
              mobileImage: offerMasterData?.imageMobileUpload ,
            })
          );
        } catch (error) {}
      }
    }
  }, [offerMasterData]);

  useEffect(() => {
    if (getCategoriesData?.post_status_code === "500") {
      toast.error(getCategoriesData?.postMessage);
      dispatch(onPostCategoryReset());
      dispatch(onGetCategory());
      dispatch(onUploadImageReset());
      dispatch(onUploadImageMobileReset());
      setCreateCategory(resetCategoryFields);
    } else if (getCategoriesData.update_status_code === "201") {
      toast.success(getCategoriesData?.updateMessage);
      dispatch(onUpdateCategoryReset());
      dispatch(onGetCategory());
      setCreateCategory(resetCategoryFields);
    } else if (getCategoriesData?.post_status_code === "201") {
      toast.success(getCategoriesData?.postMessage);
      dispatch(onPostCategoryReset());
      dispatch(onGetCategory());
      dispatch(onUploadImageReset());
      dispatch(onUploadImageMobileReset());
      setCreateCategory(resetCategoryFields);
    }else if(getCategoriesData?.post_status_code){
      toast.error(getCategoriesData?.postMessage)
      dispatch(onPostCategoryReset());
      dispatch(onGetCategory());
      dispatch(onUploadImageReset());
      dispatch(onUploadImageMobileReset());
    }
  }, [getCategoriesData]);
  useEffect(() => {
    if (Data) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [Data]);
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
                {getCategoriesData?.postLoading ||
                (getSuppliermasterData?.getSupplierLoading &&
                  getSupplierBrandListLoadingData?.supplierBrandListLoading) ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-4">
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
                            placeholder="Enter your category name"
                            value={createCategory?.name}
                            onChange={(e) => handleChange(e, "name")}
                          />

                          {createCategory?.name?.length > 250 && (
                            <p className="text-danger">{errors.name}</p>
                          )}

                          {isOpen && filterData.length > 0 && (
                            <span className="">
                              <ul>
                                {[
                                  ...new Set(
                                    filterData.map((item) => item.name)
                                  ),
                                ].map((uniqueName, index) => (
                                  <li
                                    key={index}
                                    onClick={() => handleSelect(uniqueName)}
                                  >
                                    {uniqueName}
                                  </li>
                                ))}
                              </ul>
                            </span>
                          )}
                        </div>
                        <div className="col-sm-4 form-group mb-4">
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
                                ? supplierMasterData
                                    .filter((supplier) => supplier.enabled) // Filter to keep only enabled suppliers
                                    .map((supplier) => ({
                                      label: supplier.name,
                                      value: supplier.id,
                                      data: supplier.code,
                                    }))
                                : []
                            }
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="vendor-category">
                            {supplierBrandTranslation}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "supplierBrandId")}
                            error={errors.supplierBrandId}
                            value={createCategory.supplierBrandId}
                            ariaLabel={
                              supplierBrandListData.length
                                ? "Select"
                                : "No Record Found"
                            }
                            className={` ${
                              errors.supplierBrandId
                                ? "border-danger"
                                : "form-select"
                            }`}
                            options={
                              supplierBrandListData.length
                                ? supplierBrandListData
                                : [
                                    {
                                      label: "No Record Found",
                                      value: "",
                                      disabled: true,
                                    },
                                  ]
                            }
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {displayOrder}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={`form-control ${
                              errors.displayOrder ? "border-danger" : ""
                            }`}
                            id="displayOrder"
                            placeholder="Display order"
                            value={createCategory.displayOrder}
                            onChange={(e) => handleChange(e, "displayOrder")}
                          />
                          {<p className="text-danger">{errors.displayOrder}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="image" className="flex">
                            {upload_image} for web
                            <div
                              className="info-icon"
                              onMouseEnter={() => setwebVisible(true)}
                              onMouseLeave={() => setwebVisible(false)}
                            >
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                              {webvisible && (
                                <div className="tooltip">
                                  Image size Should be 128<sup>*</sup>128px
                                </div>
                              )}
                            </div>
                            <span className="text-danger"></span>
                          </label>
                          <div className="input-group">
                            <div className="form-file">
                              <InputField
                                type="file"
                                accept="image/jpg,image/png"
                                onChange={(e) => handleChange(e, "image")}
                              />
                            </div>

                            <span className="input-group-text">{upload}</span>
                          </div>
                        </div>
                        <div className="col-sm-4 form-group mb-2 ">
                          <label htmlFor="image" className="flex">
                            {upload_image} for phone
                            <div
                              className="info-icon"
                              onMouseEnter={() => setVisible(true)}
                              onMouseLeave={() => setVisible(false)}
                            >
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                              {visible && (
                                <div className="tooltip" modalKey="Mobile">
                                  Image size Should be 83<sup>*</sup>83px
                                </div>
                              )}
                            </div>
                          </label>

                          <div className="input-group">
                            <div className="form-file">
                              <InputField
                                type="file"
                                accept="image/jpg,image/png"
                                onChange={(e) => handleChange(e, "mobileImage")}
                              />
                            </div>

                            <span className="input-group-text">{upload}</span>
                          </div>
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <div className="form-check padd">
                            <InputField
                              className="form-check-input"
                              type="checkbox"
                              name="displayHeader"
                              checked={createCategory?.displayHeader}
                              id="flexCheckDefault1"
                              onChange={(e) =>
                                handleChange(e, "displayIsOrder")
                              }
                            />
                            <label
                              className="form-check-label fnt-15"
                              htmlFor="flexCheckDefault1"
                            >
                              {displayHeader}
                            </label>
                          </div>
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
