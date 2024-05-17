/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSupplierList,
  onUpdateSupplierList,
  onUpdateSupplierListReset,
  onVendorReset,
  onVendorSubmit,
} from "../../Store/Slices/supplierMasterSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { ToastContainer, toast } from "react-toastify";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Button from "../../Components/Button/Button";
import {
  onGetSupplierResource,
  onSupplierResourceSubmit,
  onUpdateSupplierResource,
} from "../../Store/Slices/supplierResourceSlice";

const SupplierMasterForm = ({
  data,
  setData,
  isDelete,
  setIsDelete
}) => {
  const dispatch = useDispatch();
  const update = GetTranslationData("UIAdmin", "update_label");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const supplierMaster = GetTranslationData("UIAdmin", "supplierMaster");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const minThresholdAmount = GetTranslationData(
    "UIAdmin",
    "minThresholdAmount"
  );
  const required_label = GetTranslationData("UIAdmin", "required_label");
  const field_Name_Label = GetTranslationData("UIAdmin", "field_Name_Label");
  const field_Value_Label = GetTranslationData("UIAdmin", "field_Value_Label");
  const balance_Available = GetTranslationData("UIAdmin", "balance_Available");
  const supplier_API = GetTranslationData("UIAdmin", "supplier_API");
  const add_More = GetTranslationData("UIAdmin", "add_More");
  const delete_Button = GetTranslationData("UIAdmin", "delete_Button");
  const fieldNameNotEmpty = GetTranslationData("UIAdmin", "fieldNameNotEmpty");
  const service_Path = GetTranslationData("UIAdmin", "service_Path");
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const fieldValueNotEmpty = GetTranslationData(
    "UIAdmin",
    "fieldValueNotEmpty"
  );
  const [vendorData, setVendorData] = useState({
    name: "",
    balanceThresholdAmount: "",
    creditAmount: "",
    servicePath: "",
    enabled: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    balanceThresholdAmount: "",
    creditAmount: "",
    servicePath: "",
    enabled: "",
  });
  const supplyPostData = useSelector((state) => state.supplierMasterReducer);
  const supplyResource = useSelector((state) => state.supplierResourceReducer);
  const [additionalFields, setAdditionalFields] = useState([
    {
      fieldName: "",
      fieldValue: "",
      fieldDescription: "",
      id: data?.id,
    },
  ]);
  const [additionalFieldsError, setAdditionalFieldsError] = useState([
    {
      fieldName: "",
      fieldValue: "",
      fieldDescription: "",
      id: data?.id,
    },
  ]);
  const statusoptions = [
    { value: "Active", label: active },
    { value: "Non-Active", label: nonActive },
  ];
  
  const resetData = () => {
    setData({
      name: "",
      balanceThresholdAmount: "",
      creditAmount: "",
      servicePath: "",
    });
    setVendorData({
      name: "",
      balanceThresholdAmount: "",
      creditAmount: "",
      servicePath: "",
      enabled: "",
    });
    setAdditionalFields([
      {
        fieldName: "",
        fieldValue: "",
        fieldDescription: "",
        id: data?.id,
      },
    ]);
  };

  const getAdditionalFIeldData = (del = false, supplierId) => {
    let tempAdditionField = [...additionalFields];
    const additionalData = tempAdditionField.map((item) => ({
      ...item,
      enabled: true,
      deleted: del,
      fieldDescription: "test",
      supplierId: supplierId,
    }));
    return additionalData;
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (
      supplyPostData.post_status_code === "201" &&
      !supplyPostData?.isLoading
    ) {
      dispatch(onVendorReset());
      dispatch(
        onSupplierResourceSubmit(
          getAdditionalFIeldData(false, supplyPostData?.postData?.[0]?.id)
        )
      );
    } else if (
      supplyPostData?.update_status_code === "201" &&
      !supplyPostData?.putSupplierLoading
    ) {
      dispatch(onUpdateSupplierListReset());

      if (isDelete) {
        toast.success(supplyPostData?.message);
        dispatch(onGetSupplierList());
        dispatch(onGetSupplierResource());
        setIsDelete(false)
      } else {
        dispatch(
          onUpdateSupplierResource(getAdditionalFIeldData(false, data?.id))
        );
      }
      resetData();
    } else if (
      supplyPostData.post_status_code &&
      supplyPostData.post_status_code !== "201" &&
      !supplyPostData?.isLoading
    ) {
      dispatch(onVendorReset());
      toast.error(supplyPostData?.message);
    }

  }, [supplyPostData]);
  useEffect(() => {
    if (supplyResource?.status_code === "201" && !supplyResource?.isLoading) {
      toast.success(supplyResource?.message);
      dispatch(onGetSupplierList());
      dispatch(onGetSupplierResource());
      resetData();
    }
  }, [supplyResource]);

  useEffect(() => {
    // Scroll to the top of the page for visibility
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (data.name !== "") {
      setVendorData({
        name: data.name || "",
        balanceThresholdAmount: parseInt(data.balanceThresholdAmount) || "",
        creditAmount: parseInt(data.creditAmount) || "",
        servicePath: data.servicePath || "",
        enabled: data.enabled,
      });
      setErrors({
        name: "",
        balanceThresholdAmount: "",
        creditAmount: "",
        servicePath: "",
        enabled: "",
      });
      setAdditionalFieldsError([{
        fieldName: "",
        fieldValue: "",
        fieldDescription: "",
      }])
      const filterSupplierApiCred = supplyResource?.data?.filter(
        (item) => item?.supplierId === data?.id
      );
      setAdditionalFields(filterSupplierApiCred);
    }
  }, [data]);

  const handleChange = (e, fieldName) => {
    if (
      (fieldName === "balanceThresholdAmount" ||
        fieldName === "creditAmount") &&
      e.target.value < 0
    ) {
      setErrors({
        ...errors,
        [fieldName]: "Value cannot be negative",
      });
    } else if (fieldName === "status") {
      setVendorData({
        ...vendorData,
        enabled: e.target.value === active ? true : (e.target.value === nonActive ? false : ""),
      });
      setErrors({
        ...errors,
        enabled: "",
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
    const newAdditionalFieldsError = [...additionalFieldsError];

    // Check if fields are empty and set corresponding error messages
    for (const key in vendorData) {
      if (vendorData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else if (vendorData[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    additionalFields?.forEach((field, index) => {
      if (field?.fieldName === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].fieldName = fieldNameNotEmpty;
          return newAdditionalFieldsError;
        });
        isValid = false;
      } else if (field?.fieldName.length > 250) {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].fieldName =
            "Length must be 250 or fewer";
          return newAdditionalFieldsError;
        });
        isValid = false;
      }

      if (field?.fieldValue === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].fieldValue = fieldValueNotEmpty;
          return newAdditionalFieldsError;
        });
        isValid = false;
      } else if (field.fieldValue.length > 250) {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].fieldValue =
            "Length must be 250 or fewer";
          return newAdditionalFieldsError;
        });
        isValid = false;
      }
    });
    setErrors(newErrors);
    setAdditionalFieldsError(newAdditionalFieldsError);
    if (isValid) {
      if (!data.name) {
        try {
          vendorData.deleted = false;
          dispatch(onVendorSubmit(vendorData));
        } catch (error) {
          // Handle any errors during dispatch
        }
      } else if (data.name) {
        try {
          const updateData = { ...vendorData };
          updateData.id = data.id;
          dispatch(onUpdateSupplierList(updateData));
          // Define a function to show a toast notification based on loginDetails
        } catch (error) {
          // Handle any errors during dispatch
        }
      }
    }
  };
  const handleAddMore = (e) => {
    e.preventDefault();
    setAdditionalFields((prevFields) => [
      ...prevFields,
      {
        fieldName: "",
        fieldValue: "",
      },
    ]);
    setAdditionalFieldsError((prevFields) => [
      ...prevFields,
      {
        fieldName: "",
        fieldValue: "",
        fieldDescription: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    const newFields = [...additionalFields];
    newFields.splice(index, 1);
    setAdditionalFields(newFields);

    const newErrors = [...additionalFieldsError];
    newErrors.splice(index, 1);
    setAdditionalFieldsError(newErrors);
  };
  return (
    <>
      <div className="container-fluid form">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{supplierMaster}</h4>
              </div>
              <div className="card-body">
                {supplyPostData?.isLoading || (!isDelete && supplyPostData?.putSupplierLoading) ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-8 form-group mb-2">
                          <label htmlFor="name-f">
                            {supplierName}
                            <span className="text-danger">*</span>
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
                          {<p className="text-danger">{errors.name}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">
                            {status} <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "status")}
                            error={errors?.enabled}
                            value={
                              vendorData?.enabled
                                ? active
                                : vendorData?.enabled === undefined ||
                                  vendorData?.enabled === ""
                                  ? ""
                                  : nonActive
                            }
                            className={`${errors.enabled
                              ? "border-danger-select"
                              : "form-select"
                              }`}
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
                            value={vendorData?.balanceThresholdAmount}
                            className={` ${errors.balanceThresholdAmount
                              ? "border-danger"
                              : "form-control"
                              }`}
                            id="amominThresholdAmountunt"
                            placeholder="₹500000"
                            onChange={(e) =>
                              handleChange(e, "balanceThresholdAmount")
                            }
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
                            value={vendorData.creditAmount}
                            className={` ${errors.creditAmount
                              ? "border-danger"
                              : "form-control"
                              }`}
                            id="creditAmount"
                            placeholder="₹500000"
                            onChange={(e) => handleChange(e, "creditAmount")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="servicePath">
                            {service_Path}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            name="servicePath"
                            value={vendorData?.servicePath}
                            className={` ${errors.servicePath
                              ? "border-danger"
                              : "form-control"
                              }`}
                            id="servicePath"
                            placeholder=""
                            onChange={(e) => handleChange(e, "servicePath")}
                          />
                          {<p className="text-danger">{errors.servicePath}</p>}
                        </div>
                        <div className="row mt-3">
                          <h3 style={{ borderBottom: "1px solid #ededed" }}>
                            {supplier_API}
                          </h3>

                          {Array.isArray(additionalFields) &&
                            additionalFields?.map((field, index) => (
                              <React.Fragment key={index}>
                                <div className="col-lg-4">
                                  <h4>{field_Name_Label}</h4>
                                  <div className="col-sm-12 form-group mb-2">
                                    <InputField
                                      type="text"
                                      className={` ${additionalFieldsError[index]?.fieldName
                                        ? "border-danger"
                                        : "form-control"
                                        }`}
                                      name="fname"
                                      placeholder="Key"
                                      value={additionalFields[index]?.fieldName}
                                      onChange={(e) =>
                                        handleAddMoreData("fieldName", index, e)
                                      }
                                    />
                                    <p className="text-danger">
                                      {additionalFieldsError[index]?.fieldName}
                                    </p>
                                  </div>
                                </div>

                                <div className="col-lg-4">
                                  <h4>{field_Value_Label}</h4>
                                  <div className="col-sm-12 form-group mb-2">
                                    <InputField
                                      type="text"
                                      className={` ${additionalFieldsError[index]?.fieldValue
                                        ? "border-danger"
                                        : "form-control"
                                        }`}
                                      name="fname"
                                      placeholder="Value"
                                      value={additionalFields[index]?.fieldValue}
                                      onChange={(e) =>
                                        handleAddMoreData(
                                          "fieldValue",
                                          index,
                                          e
                                        )
                                      }
                                    />
                                    <p className="text-danger">
                                      {additionalFieldsError[index]?.fieldValue}
                                    </p>
                                  </div>
                                </div>

                                {index < additionalFields?.length - 1 && (
                                  <div className="col-lg-3">
                                    <br />
                                    <div className="col-sm-12 form-group mb-7">
                                      <Button
                                        className="btn btn-primary btn-sm float-right pad-aa mt-03"
                                        text={delete_Button}
                                        icon={"fa fa-trash"}
                                        onClick={() => handleDelete(index)}
                                      />
                                    </div>
                                  </div>
                                )}
                              </React.Fragment>
                            ))}

                          <div className="col-lg-3">
                            <div className="col-sm-12 form-group mb-7 btn-m">
                              <Button
                                className="btn btn-primary btn-sm float-right pad-aa mt-03"
                                text={add_More}
                                icon={"fa fa-plus"}
                                onClick={(e) => handleAddMore(e)}
                              />
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
                          <Button
                            text={data.name ? update : submit}
                            icon={"fa fa-arrow-right"}
                            className="btn btn-primary float-right pad-aa mt-2"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
