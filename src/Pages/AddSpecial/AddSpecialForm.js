import React, { useState } from 'react'
import InputField from '../../Components/InputField/InputField'
import Dropdown from '../../Components/Dropdown/Dropdown'
import Button from '../../Components/Button/Button';
import { useDispatch } from 'react-redux';
import { onAddSpecialSubmit } from '../../Store/Slices/addSpecialListSlice';

const AddSpecialForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        sectionName: "",
        displayOrder: "",
        status: "",
        maxNumBrand: "",
    })
    const [error, setError] = useState({
        sectionName: "",
        displayOrder: "",
        status: "",
        maxNumBrand: "",
    })
    const statusoptions = [
        { value: "Active", label: "Active" },
        { value: "Non-Active", label: "Non-Active" },
    ];

    const handleInput = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });
        setError({
            ...error,
            [fieldName]: "",
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { ...error };
        for (const key in formData) {
            if (formData[key] === "") {
                newErrors[key] = " ";
                isValid = false;
            } else {
                newErrors[key] = "";
            }
        }
        setError(newErrors);
        dispatch(onAddSpecialSubmit(formData));
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Add Special Master</h4>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div className="row">
                                            <div className="col-sm-3 form-group mb-2">
                                                <label htmlFor="name-f">Section Name</label>
                                                <InputField
                                                    type="text"
                                                    value={formData?.sectionName}
                                                    className={`${error.sectionName ? "border-danger" : "form-control"}`}
                                                    name="fname"
                                                    id="name-f"
                                                    onChange={(e) => handleInput(e, "sectionName")}
                                                />
                                            </div>
                                            <div className="col-sm-3 form-group mb-2">
                                                <label htmlFor="email">Display Order</label>
                                                <InputField
                                                    type="text"
                                                    value={formData?.displayOrder}
                                                    className={`${error.displayOrder ? "border-danger" : "form-control"}`}
                                                    name="email"
                                                    id="email"
                                                    onChange={(e) => handleInput(e, "displayOrder")}
                                                />
                                            </div>
                                            <div className="col-sm-3 form-group mb-2">
                                                <label htmlFor="status">Status</label>
                                                <Dropdown
                                                    aria-label="Default select example"
                                                    onChange={(e) => handleInput(e, "status")}
                                                    value={
                                                        formData?.status
                                                            ? "Active"
                                                            : formData?.status === undefined ||
                                                                formData?.status === ""
                                                                ? ""
                                                                : "Non-Active"
                                                    }
                                                    className={`${error.status ? "border-danger-select" : "form-select"}`}
                                                    options={statusoptions}
                                                />
                                            </div>
                                            <div className="col-sm-3 form-group mb-2">
                                                <label htmlFor="name-f">Max. No. of Brands</label>
                                                <InputField
                                                    type="text"
                                                    value={formData?.maxNumBrand}
                                                    className={`${error.maxNumBrand ? "border-danger" : "form-control"}`}
                                                    name="fname"
                                                    id="name-f"
                                                    onChange={(e) => handleInput(e, "maxNumBrand")}
                                                />
                                            </div>
                                            <div className="col-sm-12 form-group mb-0 mt-2">
                                                <Button
                                                    className="btn btn-primary float-right pad-aa"
                                                    text="Submit"
                                                    icon={"fa fa-arrow-right"}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        </>
    )
}

export default AddSpecialForm