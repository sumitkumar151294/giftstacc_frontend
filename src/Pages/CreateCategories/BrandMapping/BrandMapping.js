import React, { useState } from 'react'
import Loader from '../../../Componenets/Loader/Loader';
import { useDispatch } from "react-redux";
import { GetTranslationData } from '../../../Componenets/GetTranslationData/GetTranslationData ';
// import { onCategorySubmit } from "../../redux/modules/Admin/categorySlice";

const BrandMapping = () => {
    const [isformLoading, setIsFormLoading] = useState("true");
    const [errors, setErrors] = useState({
        categoryName: "",
        vendorCategory: "",
        status: "",
        brand: "",
    });

    const [createCategory, setCreateCategory] = useState({
        categoryName: "",
        vendorCategory: "",
        status: "",
        brand: "",
    });
    const createUpdateBrandMapping = GetTranslationData("UIAdmin", "createUpdateBrandMapping");
    const categoryName = GetTranslationData("UIAdmin", "categoryName");
    const Supplier_name_Label = GetTranslationData("UIAdmin", "Supplier_name_Label");
    const supplierBrand = GetTranslationData("UIAdmin", "supplierBrand");
    const select = GetTranslationData("UIAdmin", "select");
    const selectStatus = GetTranslationData("UIAdmin", "selectStatus");
    const required_label = GetTranslationData("UIAdmin", "required_label");
    const active = GetTranslationData("UIAdmin", "active");
    const inActive = GetTranslationData("UIAdmin", "inActive");
  const submit = GetTranslationData("UIAdmin", "submit_label");

    const dispatch = useDispatch();

    const handleChange = (e, fieldName) => {
        setCreateCategory({
            ...createCategory,
            [fieldName]: e.target.value,
        });

        // Remove the error message when the user starts typing
        setErrors({
            ...errors,
            [fieldName]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = { ...errors };

        // Check if fields are empty and set corresponding error messages
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
            //   dispatch(onCategorySubmit(createCategory));
        }
    };

    return (
        <>
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
                                {!isformLoading ? (
                                    <div style={{ height: "200px" }}>
                                        <Loader classType={"absoluteLoader"} />
                                    </div>
                                ) : (
                                    <div className="container mt-3">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-sm-3 form-group mb-2">
                                                    <label htmlFor="name-f">{categoryName}<span className='text-danger'>*</span></label>
                                                    <input
                                                        type="text"
                                                        className={` ${errors.categoryName
                                                            ? "form-select-error"
                                                            : "form-select"
                                                            }`}
                                                        name="categoryName"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "categoryName")}
                                                    />
                                                </div>
                                                <div className="col-sm-3 form-group mb-2">
                                                    <label htmlFor="vendor-category">{Supplier_name_Label}<span className='text-danger'>*</span></label>
                                                    <select
                                                        className={` ${errors.vendorCategory
                                                            ? "form-select-error"
                                                            : "form-select"
                                                            }`}
                                                        id="vendor-category"
                                                        name="vendorCategory"
                                                        onChange={(e) => handleChange(e, "vendorCategory")}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="">{select}</option>
                                                        <option value="E-Commerce">E-Commerce</option>
                                                        <option value="Electronics">Electronics</option>
                                                        <option value="Kitchen Appliances">
                                                            Kitchen Appliances
                                                        </option>
                                                        <option value="Health">Health</option>
                                                        <option value="Insurance">Insurance</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-3 form-group mb-2">
                                                    <label htmlFor="vendor-category">
                                                        {supplierBrand}<span className='text-danger'>*</span>
                                                    </label>
                                                    <select
                                                        className={` ${errors.brand
                                                            ? "form-select-error"
                                                            : "form-select"
                                                            }`}
                                                        id="vendor-category"
                                                        name="vendorCategory"
                                                        onChange={(e) => handleChange(e, "brand")}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="">{select}</option>
                                                        <option value="E-Commerce">E-Commerce</option>
                                                        <option value="Electronics">Electronics</option>
                                                        <option value="Kitchen Appliances">
                                                            Kitchen Appliances
                                                        </option>
                                                        <option value="Health">Health</option>
                                                        <option value="Insurance">Insurance</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-3 form-group mb-2">
                                                    <label htmlFor="status">{selectStatus}<span className='text-danger'>*</span></label>
                                                    <select
                                                        className={` ${errors.status
                                                            ? "form-select-error"
                                                            : "form-select"
                                                            }`}
                                                        id="status"
                                                        name="status"
                                                        onChange={(e) => handleChange(e, "status")}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="">{select}</option>
                                                        <option value="Active">{active}</option>
                                                        <option value="In-Active">{inActive}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <span className="form-check-label" for="basic_checkbox_1">
                                               {required_label}
                                            </span>
                                            <div class="col-sm-4 mt-2 mb-4">
                                                <button class="btn btn-primary float-right pad-aa">
                                                    {submit} <i class="fa fa-arrow-right"></i>
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
    )
}

export default BrandMapping
