import React, { useEffect, useState } from 'react';
import Loader from '../../../Componenets/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { onPostCategory } from '../../../Store/Slices/createCategorySlice';
import InputField from '../../../Componenets/InputField/InputField';
import Dropdown from '../../../Componenets/Dropdown/Dropdown';
import { onGetSupplierList } from '../../../Store/Slices/supplierMasterSlice';
import { onGetSupplierBrandList } from '../../../Store/Slices/supplierBrandListSlice';
import { ToastContainer, toast } from 'react-toastify';
import { GetTranslationData } from '../../../Componenets/GetTranslationData/GetTranslationData ';
import ScrollToTop from '../../../Componenets/ScrollToTop/ScrollToTop';
import NoRecord from '../../../Componenets/NoRecord/NoRecord';
import CategoryList from '../CategoryList/CategoryList';

const BrandMapping = () => {
    const dispatch = useDispatch();
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [errors, setErrors] = useState({
        categoryName: '',
        supplierName: '',
        supplierBrand: '',
    });
    const [createCategory, setCreateCategory] = useState({
        categoryName: '',
        supplierName: '',
        supplierBrand: '',
    });
    const getMessage = useSelector((state)=> state.createCategoryReducer.message);
    useEffect(() => {
        dispatch(onGetSupplierList());
    }, []);

    useEffect(() => {
        dispatch(onGetSupplierBrandList());
    }, []);

    const getSupplierMasterData = useSelector((state) => state.supplierMasterReducer);
    const getSupplierName = getSupplierMasterData.data.data;


    const createUpdateBrandMapping = GetTranslationData('UIAdmin', 'createUpdateBrandMapping');
    const categoryNameTranslation = GetTranslationData('UIAdmin', 'categoryName');
    const supplierNameLabelTranslation = GetTranslationData('UIAdmin', 'Supplier_name_Label');
    const supplierBrandTranslation = GetTranslationData('UIAdmin', 'supplierBrand');
    const requiredLabelTranslation = GetTranslationData('UIAdmin', 'required_label');
    const submitTranslation = GetTranslationData('UIAdmin', 'submit_label');

    const brandOptions = [
        { label: 'Havels', value: 'havels' },
        { label: 'Zara', value: 'zara' },
        { label: 'Campus', value: 'campus' },
        { label: 'Puma', value: 'puma' },
        { label: 'Sony', value: 'sony' },
    ];

    const handleChange = (e, fieldName) => {
        setCreateCategory({
            ...createCategory,
            [fieldName]: e.target.value,
        });

        setErrors({
            ...errors,
            [fieldName]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormLoading(true);

        let isValid = true;
        const newErrors = { ...errors };

        for (const key in createCategory) {
            if (createCategory[key] === '') {
                newErrors[key] = 'This field is required';
                isValid = false;
            } else {
                newErrors[key] = '';
            }
        }

        setErrors(newErrors);

        if (isValid) {
            try {
                await dispatch(onPostCategory(createCategory));
                toast.success(getMessage);
                setCreateCategory({
                    categoryName: '',
                    supplierName: '',
                    supplierBrand: '',
                });
            } catch (error) {
                toast.error('An error occurred');
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title txt-admin txtt ">{createUpdateBrandMapping}</h4>
                            </div>
                          
                                <div className="card-body position-relative">
                                    {isFormLoading ? (
                                        <div style={{ height: '200px' }}>
                                            <Loader classType={'absoluteLoader'} />
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
                                                            className={` ${errors.categoryName ? 'border-danger' : 'form-control'}`}
                                                            name="categoryNam"
                                                            id="name-f"
                                                            placeholder=""
                                                            value={createCategory.categoryName}
                                                            onChange={(e) => handleChange(e, 'categoryName')}
                                                        />
                                                    </div>
                                                    <div className="col-sm-3 form-group mb-2">
                                                        <label htmlFor="vendor-category">
                                                            {supplierNameLabelTranslation}
                                                            <span className="text-danger">*</span>
                                                        </label>
                                                        <Dropdown
                                                            onChange={(e) => handleChange(e, 'supplierName')}
                                                            error={errors.supplierName}
                                                            ariaLabel="Select"
                                                            className={` ${errors.supplierName ? 'border-danger' : 'form-control'}`}
                                                            options={getSupplierName?.map((supplier) => ({
                                                                label: supplier.name,
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="col-sm-3 form-group mb-2">
                                                        <label htmlFor="vendor-category">
                                                            {supplierBrandTranslation}
                                                            <span className="text-danger">*</span>
                                                        </label>
                                                        <Dropdown
                                                            onChange={(e) => handleChange(e, 'supplierBrand')}
                                                            error={errors.supplierBrand}
                                                            ariaLabel="Select"
                                                            className={` ${errors.supplierBrand ? 'border-danger' : 'form-control'}`}
                                                            options={brandOptions}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="form-check-label" htmlFor="basic_checkbox_1">
                                                    {requiredLabelTranslation}
                                                </span>
                                                <div className="col-sm-4 mt-2 mb-4">
                                                    <button type="submit" className="btn btn-primary float-right pad-aa">
                                                        {submitTranslation} <i className="fa fa-arrow-right"></i>
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
            <ToastContainer />
        </>
    );
};

export default BrandMapping;
