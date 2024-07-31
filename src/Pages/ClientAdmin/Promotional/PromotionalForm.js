import React, { useEffect, useState } from 'react';
import InputField from '../../../Components/InputField/InputField';
import Dropdown from '../../../Components/Dropdown/Dropdown';
import { GetTranslationData } from '../../../Components/GetTranslationData/GetTranslationData ';
import {  onGetPromtional, onPromtionalSubmit, onPromtionalSubmitReset, onUpdatePromotional, onUpdatePromotionalReset } from '../../../Store/Slices/ClientAdmin/promotionalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, InputGroup } from 'rsuite';
import Button from '../../../Components/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../../Components/Loader/Loader';
import { GetClientId } from '../../../Common/commonSlice/CommonSlice';

const PromotionalForm = ({ prefilledValues, setPrefilledValues, isDelete, setIsDelete }) => {
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const title_Text = GetTranslationData("UIAdmin", "title_Text");
  const Status_label = GetTranslationData("UIAdmin", "Status_label");
  const start_and_enddate = GetTranslationData("UIAdmin", "start_and_enddate");
  const link_text = GetTranslationData("UIClient", "link_text");
  const link_placeholder = GetTranslationData("UIClient", "link_placeholder");
  const link_text_placeholder = GetTranslationData("UIClient", "link_text");
  const title_placeholder = GetTranslationData("UIClient", "title_placeholder");
  const link_label = GetTranslationData("UIClient", "link_label");
  const promotional_Strip_Master = GetTranslationData("UIAdmin", "promotional_Strip_Master");
  const overlap_date_error_msg = GetTranslationData("UIAdmin", "overlap_date_error_msg");
  const dispatch = useDispatch();
  const clientId = GetClientId();
  const promotionalData = useSelector((state) => state.promotionalReducer);
  const [formData, setFormData] = useState({
    titleText: '',
    enabled: '',
    linkText: '',
    link: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({
    titleText: '',
    enabled: '',
    linkText: '',
    link: '',
    startDate: '',
    endDate: ''
  });
  const resetData = () => {
    setFormData({
      titleText: '',
      enabled: '',
      linkText: '',
      link: '',
      startDate: '',
      endDate: ''
    });
  };

  const statusOptions = [
    { value: true, label: active },
    { value: false, label: nonActive },
  ];
  useEffect(() => {
    dispatch(onGetPromtional());
  }, [])
  useEffect(() => {
    if (promotionalData.post_status_code === "201") {
      dispatch(onGetPromtional());
      toast.success(promotionalData.postMessage);
      dispatch(onPromtionalSubmitReset());
      resetData();
    } else if (promotionalData.update_status_code === "201") {
      dispatch(onGetPromtional());
      toast.success(promotionalData.updateMessage);
      dispatch(onUpdatePromotionalReset());
      if (isDelete) {
        dispatch(onGetPromtional());
        dispatch(onUpdatePromotionalReset());
        setIsDelete(false)
      }
      resetData();
    } else if (promotionalData.post_status_code === '400') {
      toast.error(promotionalData.postMessage);
      dispatch(onPromtionalSubmitReset());
    }
  }, [promotionalData]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFormData({
      titleText: prefilledValues?.titleText || "",
      enabled: prefilledValues?.enabled !== undefined ? prefilledValues.enabled : "",
      linkText: prefilledValues?.linkText || "",
      link: prefilledValues?.link || "",
      startDate: prefilledValues?.startDate || "",
      endDate: prefilledValues?.endDate || "",
    });
    setErrors({
      titleText: '',
      enabled: '',
      linkText: '',
      link: '',
      startDate: '',
      endDate: ''
    });
  }, [prefilledValues]);

  const handleChange = (e, fieldName) => {
    let value = e.target.value;
        let newErrors = { ...errors };
    if (fieldName === 'link') {
      const urlRegex = /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?/;
      const isValidUrl = urlRegex.test(value);
      newErrors[fieldName] = isValidUrl ? "" : " ";
    } else {
      newErrors[fieldName] = "";
    }
    if (fieldName === "enabled") {
      if (value === "true" || value === "false") {
        value = value === "true";
      } else {
        value = "";
      }
    }
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setErrors(newErrors);
  };

  const handleDateChange = (dates, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: dates,
    });
    setErrors({
      ...errors,
      [fieldName]: '',
    });
  };
  const checkDateOverlap = (newStartDate, newEndDate) => {
    const existingPromotionalData = promotionalData.getData || [];
    if (!Array.isArray(existingPromotionalData)) return false; 
    return existingPromotionalData.some((promo) => {
      const start = new Date(promo.startDate);
      const end = new Date(promo.endDate);
      const newStart = new Date(newStartDate);
      const newEnd = new Date(newEndDate);
      return promo.enabled && ((newStart >= start && newStart <= end) || (newEnd >= start && newEnd <= end));
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === "Select") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    if (!formData.startDate) {
      newErrors.startDate = " ";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = " ";
      isValid = false;
    }
    if (formData.enabled && checkDateOverlap(formData.startDate, formData.endDate)) {
      toast.error(overlap_date_error_msg);
      isValid = false;
    }
    setErrors(newErrors);
    if (isValid) {
      if (!prefilledValues?.titleText) {
        try {
          const updateData = { ...formData };
          updateData.clientId = clientId;
          dispatch(onPromtionalSubmit(updateData))
          setPrefilledValues("")
        } catch (error) {
          // Handle any errors during dispatch
        }
      } else if (prefilledValues?.titleText) {
        try {
          const updateData = { ...formData };
          updateData.id = prefilledValues.id;
          updateData.clientId = clientId;
          dispatch(onUpdatePromotional(updateData));
          setPrefilledValues("")
        } catch (error) {
          // Handle any errors during dispatch
        }
      }
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{promotional_Strip_Master}</h4>
              </div>
              <div className="card-body">
                {promotionalData?.postLoading || (!isDelete && promotionalData?.putLoading) ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">{title_Text}</label>
                          <InputField
                            type="text"
                            className={`${errors.titleText ? "border-danger" : "form-control"}`}
                            name="titleText"
                            id="name-f"
                            placeholder={title_placeholder}
                            value={formData.titleText}
                            onChange={(e) => handleChange(e, "titleText")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="linkText">{link_text}</label>
                          <InputField
                            type="url"
                            name="linkText"
                            className={`${errors.linkText ? "border-danger" : "form-control"}`}
                            id="linkText"
                            placeholder={link_text_placeholder}
                            value={formData.linkText}
                            onChange={(e) => handleChange(e, "linkText")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="link">{link_label}</label>
                          <InputField
                            type="url"
                            name="link"
                            className={`${errors.link ? "border-danger" : "form-control"}`}
                            id="link"
                            placeholder={link_placeholder}
                            value={formData.link}
                            onChange={(e) => handleChange(e, "link")}
                          />
                        </div>
                        <div className="col-sm-4">
                          <div className="example">
                            <label>{start_and_enddate}</label>

                            <InputGroup
                              className={`${(errors.startDate || errors.endDate) ? "border-danger-date" : "dateInput"}`}
                            >
                              <DatePicker
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Start Date"
                                value={formData.startDate ? new Date(formData.startDate) : null}
                                onChange={(e) => handleDateChange(e, 'startDate')}
                                block
                                appearance="subtle"
                              />
                              <DatePicker
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="End Date"
                                value={formData.endDate ? new Date(formData.endDate) : null}
                                onChange={(e) => handleDateChange(e, 'endDate')}
                                block
                                appearance="subtle"
                              />
                            </InputGroup>
                          </div>
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">{Status_label}</label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "enabled")}
                            value={formData.enabled !== undefined
                              ? formData.enabled
                              : ""}
                            className={`${errors?.enabled ? "border-danger-select" : "form-select"}`}
                            options={statusOptions}
                          />
                        </div>
                        <div className="row">
                          <div className="col-sm-12 form-group mb-0 mt-2">
                            <Button
                              text={prefilledValues ? update : submit}
                              icon={"fa fa-arrow-right"}
                              onClick={handleSubmit}
                              className="btn btn-primary float-right pad-aa"
                            />
                          </div>
                        </div>
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
}

export default PromotionalForm;
