import React, { useEffect, useState } from 'react'
import Loader from '../../../Componenets/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from '../../../Componenets/GetTranslationData/GetTranslationData ';
import { onPostCategory } from '../../../Store/Slices/createCategorySlice';
import InputField from '../../../Componenets/InputField/InputField';
import Dropdown from '../../../Componenets/Dropdown/Dropdown';
import { onGetSupplierList } from '../../../Store/Slices/supplierMasterSlice';
import { onGetSupplierBrandList } from '../../../Store/Slices/supplierBrandListSlice';

const BrandMapping = () => {
    const dispatch = useDispatch();
    const [isformLoading, setIsFormLoading] = useState("true");

    // To validate the input fields 
    const [errors, setErrors] = useState({
        categoryName: "",
        supplierName: "",
        supplierBrand: "",
    });

    // to post the data through api 
    const [createCategory, setCreateCategory] = useState({
        categoryName: "",
        supplierName: "",
        supplierBrand: "",
    });

    // call the get api for supplier master 
    useEffect(() => {
        dispatch(onGetSupplierList());
    }, [])

    //call the get api for supplier brand
    useEffect(()=>{
        dispatch(onGetSupplierBrandList());
    },[])

    // To get supplier name from redux store 
    const getSupplierMasterData = useSelector((state) => state.supplierMasterReducer);
    const getSupplierName = getSupplierMasterData.data.data;

    // To get the label of fields from the api 
    const createUpdateBrandMapping = GetTranslationData("UIAdmin", "createUpdateBrandMapping");
    const categoryName = GetTranslationData("UIAdmin", "categoryName");
    const Supplier_name_Label = GetTranslationData("UIAdmin", "Supplier_name_Label");
    const supplierBrand = GetTranslationData("UIAdmin", "supplierBrand");
    const required_label = GetTranslationData("UIAdmin", "required_label");
    const submit = GetTranslationData("UIAdmin", "submit_label");

    const brandOptions = [
        { label: "Havels", value: "havels" },
        { label: "Zara", value: "zara" },
        { label: "Campus", value: "campus" },
        { label: "Puma", value: "puma" },
        { label: "Sony", value: "sony" },
      ];

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
            dispatch(onPostCategory(createCategory));
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
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.categoryName ? "border-danger" : "form-control"
                                                            }`}
                                                        name="categoryNam"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "categoryName")}
                                                    />
                                                </div>
                                                <div className="col-sm-3 form-group mb-2">
                                                    <label htmlFor="vendor-category">{Supplier_name_Label}<span className='text-danger'>*</span></label>
                                                    <Dropdown
                                                        onChange={(e) => handleChange(e, "supplierName")}
                                                        error={errors.supplierName}
                                                        ariaLabel="Select"
                                                        className={` ${errors.supplierName ? "border-danger" : "form-control"}`}
                                                        options={getSupplierName?.map(supplier => ({
                                                            label: supplier.name
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-sm-3 form-group mb-2">
                                                    <label htmlFor="vendor-category">
                                                        {supplierBrand}<span className='text-danger'>*</span>
                                                    </label>
                                                    <Dropdown
                                                        onChange={(e) => handleChange(e, "supplierBrand")}
                                                        error={errors.supplierBrand}
                                                        ariaLabel="Select"
                                                        className={` ${errors.supplierBrand ? "border-danger" : "form-control"}`}
                                                    options={brandOptions}
                                                    />
                                                </div>
                                            </div>
                                            <span className="form-check-label" htmlFor="basic_checkbox_1">
                                                {required_label}
                                            </span>
                                            <div className="col-sm-4 mt-2 mb-4">
                                                <button type="submit" className="btn btn-primary float-right pad-aa">
                                                    {submit} <i className="fa fa-arrow-right"></i>
                                                </button>
                                                {/* <Button text={submit} /> */}
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
