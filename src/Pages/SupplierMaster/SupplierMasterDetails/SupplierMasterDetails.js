import React, { useState, useEffect } from "react";
import Loader from "../../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onGetSupplierList, onUpdateSupplierList, onVendorSubmit } from "../../../Store/Slices/supplierMasterSlice";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { ToastContainer, toast } from "react-toastify";
import { onClientMasterSubmit } from "../../../Store/Slices/clientMasterSlice";
import InputField from "../../../Components/InputField/InputField";
import './SupplierMasterDetails.scss'
import Dropdown from "../../../Components/Dropdown/Dropdown";

const SupplierMasterDetails = ({ data }) => {
  const dispatch = useDispatch();
  const update = GetTranslationData("UIAdmin", "update_label");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const supplierMaster = GetTranslationData("UIAdmin", "supplierMaster");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const minThresholdAmount = GetTranslationData("UIAdmin", "minThresholdAmount");
  const required_label = GetTranslationData("UIAdmin", "required_label");
  const field_Name_Label = GetTranslationData("UIAdmin", "field_Name_Label");
  const field_Value_Label = GetTranslationData("UIAdmin", "field_Value_Label");
  const balance_Available = GetTranslationData("UIAdmin", "balance_Available");
  const supplier_API = GetTranslationData("UIAdmin", "supplier_API");
  const add_More = GetTranslationData("UIAdmin", "add_More");
  const delete_Button = GetTranslationData("UIAdmin", "delete_Button");
  const fieldNameNotEmpty = GetTranslationData("UIAdmin", "fieldNameNotEmpty");
  const fieldValueNotEmpty = GetTranslationData("UIAdmin", "fieldValueNotEmpty");
  const addedSuccessfully = GetTranslationData("UIAdmin", "addedSuccessfully");
  const updateSuccessfully = GetTranslationData("UIAdmin", "updateSuccessfully");

  const [isformLoading, setIsFormLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [vendorData, setVendorData] = useState({});
  const [errors, setErrors] = useState({});
  const supplyPostData = useSelector((state) => state.supplierMasterReducer);
  const [additionalFields, setAdditionalFields] = useState([
    { fieldName: "", fieldValue: "" },
  ]);
  const [additionalFieldsError, setAdditionalFieldsError] = useState([
    { fieldName: "", fieldValue: "" },
  ]);
  const statusoptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Update the state when the data prop changes
    setVendorData({
      name: data?.name || "",
      // secret: "",
      // id: data?.id || "",
      // username: "",
      // password: "",
      // endPoint: "",
      // code: "",
      status: "",
      // amount: "",
      minThresholdAmount: "",
      availabelAmount: "",
      // fieldName: "",
      // fieldValue: "",
    });

    // You may also want to reset errors here if needed
    setErrors({
      name: "",
      // secret: "",
      // id: "",
      // username: "",
      // password: "",
      // endPoint: "",
      // code: "",
      status: "",
      // amount: "",
      minThresholdAmount: "",
      availabelAmount: "",
      // fieldName: "",
      // fieldValue: "",
    });

    if (supplyPostData.status_code === 200) {
      setIsFormLoading(false);
      dispatch(onGetSupplierList());
    }
  }, [data]);

 

  const handleChange = (e, fieldName) => {
    // Validate non-negativity for minThresholdAmount and availabelAmount
    if ((fieldName === 'minThresholdAmount' || fieldName === 'availabelAmount') && e.target.value < 0) {
      setErrors({
        ...errors,
        [fieldName]: "Value cannot be negative",
      });
    } else {
      setVendorData({
        ...vendorData,
        [fieldName]: e.target.value,
      });

      // Remove the error message when the user starts typing
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  
  const handleAddMoreData = (field, index, e) => {
    setAdditionalFields((prevFields) => {
      const newData = [...prevFields];
      newData[index] = { ...newData[index], [field]: e.target.value };
      return newData;
    });
  
    setAdditionalFieldsError((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [field]: "" };
      return newErrors;
    });
  };
  

  //  Submit Button for handle  input fields data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    const newAdditionalFieldsError = [ ...additionalFieldsError ];

    // Check if fields are empty and set corresponding error messages
    for (const key in vendorData) {
      if (vendorData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
   
    additionalFields.forEach((field, index) => {
      if (field.fieldName === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].fieldName = fieldNameNotEmpty;
          return newAdditionalFieldsError;
        });
        
        isValid = false;
      }
  
      if (field.fieldValue === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].fieldValue = fieldValueNotEmpty;
          return newAdditionalFieldsError;
        });
        
        isValid = false;
      }
    });
    setErrors(newErrors);
    setAdditionalFieldsError(newAdditionalFieldsError)
    if (isValid) {
      if (!data.name) {
        try {
          setShowToast(true);
          vendorData.supplierApiDetails = additionalFields
          dispatch(onVendorSubmit(vendorData));
        } catch (error) {
          // Handle any errors during dispatch
        }
      } else if (data.name) {
        try {
          setShowUpdate(true);
          vendorData.supplierApiDetails = additionalFields
          await dispatch(onUpdateSupplierList(vendorData));

          // Define a function to show a toast notification based on loginDetails
        } catch (error) {
          // Handle any errors during dispatch
        }
      }
    }
  };

  useEffect(() => {
    if (showToast) {
      if (supplyPostData.message === addedSuccessfully) {
        // dispatch(onGetSupplierList());
        toast.success(supplyPostData.message);
      }
      else {
        // toast.error(supplyPostData.message);
      }
    }
    if (showUpdate) {
      if (supplyPostData.message === updateSuccessfully) {
        dispatch(onClientMasterSubmit());
        toast.success(supplyPostData.message);
      }
    }
  }, [supplyPostData.message]);

  const [showDelete, setShowDelete] = useState(false);
  const handleAddMore = (e) => {
    e.preventDefault();
    setShowDelete(true);
    setAdditionalFields((prevFields) => [
      ...prevFields,
      {
        fieldName: "",
        fieldValue: "",
        showDelete: true, // Set showDelete to true for the newly added field
      },
    ]);
  };

  const handleDelete = (index) => {
    const newFields = [...additionalFields];
    newFields.splice(index, 1);
    setAdditionalFields(newFields);
  };

 
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{supplierMaster}</h4>
              </div>
              <div className="card-body position-relative">
                {isformLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) :
                  <div className="container mt-3">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-8 form-group mb-2">
                          <label htmlFor="name-f">
                            {supplierName} <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={vendorData?.name}
                            className={` ${errors.name ? "border-danger" : "form-control"
                              }`}
                            name="fname"
                            id="name-f"
                            placeholder=""
                            onChange={(e) => handleChange(e, "name")}
                          />
                        </div>


                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">
                            {status} <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "status")}
                            error={errors.status}
                            value={vendorData.status || ""}
                            className="form-select"
                            options={statusoptions}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="amount">
                            {minThresholdAmount}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            name="text"
                            value={vendorData.minThresholdAmount}
                            className={` ${errors.minThresholdAmount ? "border-danger" : "form-control"}`}
                            id="amominThresholdAmountunt"
                            placeholder=""
                            onChange={(e) => handleChange(e, "minThresholdAmount")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="availabelAmount">
                            {balance_Available}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            name="text"
                            value={vendorData.availabelAmount}
                            className={` ${errors.availabelAmount ? "border-danger" : "form-control"}`}
                            id="availabelAmount"
                            placeholder=""
                            onChange={(e) => handleChange(e, "availabelAmount")}
                          />
                        </div>

                        <div className="row mt-3">
                          <h3 style={{ borderBottom: '1px solid #ededed' }}>{supplier_API}</h3>

                          {additionalFields?.map((field, index) => (
                            <React.Fragment key={index}>
                              <div className="col-lg-4">
                                <h4>{field_Name_Label}</h4>
                                <div className="col-sm-12 form-group mb-2">
                                  <InputField
                                    type="text"
                                    className={` ${additionalFieldsError[index]?.fieldName ? "border-danger" : "form-control"}`}
                                    name="fname"
                                    placeholder="Key"
                                    value={additionalFields[index].fieldName}
                                    onChange={(e) => handleAddMoreData('fieldName', index, e)}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-4">
                                <h4>{field_Value_Label}</h4>
                                <div className="col-sm-12 form-group mb-2">
                                  <InputField
                                    type="text"
                                    className={` ${additionalFieldsError[index]?.fieldValue ? "border-danger" : "form-control"}`}
                                    name="fname"
                                    placeholder="Value"
                                    value={additionalFields[index].fieldValue}
                                    onChange={(e) => handleAddMoreData('fieldValue', index, e)}
                                  />
                                </div>
                              </div>

                              {index < additionalFields.length - 1 &&
                                (<div className="col-lg-3">
                                  <br />
                                  <div className="col-sm-12 form-group mb-7">
                                    <button
                                      className="btn btn-danger btn-sm float-right pad-aa mt-2"
                                      onClick={() => handleDelete(index)}
                                    >
                                      {delete_Button} <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>)}
                            </React.Fragment>
                          ))}

                          <div className="col-lg-3">
                            <br />
                            <div className="col-sm-12 form-group mb-7">
                              <button
                                className="btn btn-primary btn-sm float-right pad-aa mt-2"
                                onClick={(e) => handleAddMore(e)}
                              >
                              {add_More} <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>

                        </div>

                        <span
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                        >
                          {required_label}
                        </span>

                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary float-right pad-aa"
                          >
                            {data.name ? update : submit}
                            <i className="fa fa-arrow-right"></i>
                          </button>
                          <ToastContainer />
                        </div>
                      </div>
                    </form>

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierMasterDetails;
