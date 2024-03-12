import React, { useEffect, useState } from "react";
import HtmlEditor from "../../../Components/HtmlEditor/HtmlEditor";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import {
  onGetCms,
  onPostCms,
  onPostCmsReset,
  onUpdateCms,
  onUpdateCmsReset,
} from "../../../Store/Slices/ClientAdmin/cmsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import Dropdown from "../../../Components/Dropdown/Dropdown";
const CMSForm = ({ Cmsprefilled, setCmsprefilled }) => {
  const sumbit = GetTranslationData("UIAdmin", "submit_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const cms = GetTranslationData("UIClient", "cms");
  const ShortDescription = GetTranslationData("UIClient", "short_description");
  const LongDescription = GetTranslationData("UIClient", "long_description");
  const dispatch = useDispatch();
  const getCmsData = useSelector((state) => state.cmsReducer);
  const [cmsData, setCmsData] = useState({
    clientId: "123",
    title: "",
    shortDescription: "",
    longDescription: "",
  });
  const resetCMSData = {
    title: "",
    shortDescription: "",
    longDescription: "",
  };
  const [errors, setErrors] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
  });
  const handleChange = (e, fieldName, html) => {
    setCmsData({
      ...cmsData,
      [fieldName]: e.target?.value,
      [html]: e.target?.value,
    });
    // Remove the error message when the user starts typing
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };
  const handleHTMLChange = (html, fieldName) => {
    setCmsData((prevCmsData) => ({
      ...prevCmsData,
      longDescription: html,
    }));
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };
  const PageNames = [
    "About us",
    "Privacy Policy",
    "Terms and Conditions",
    "LC Loyality Program",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    // Check if fields are empty and set corresponding error messages
    for (const key in cmsData) {
      if (cmsData[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid) {
      if (!Cmsprefilled) {
        const Usersdata = {
          ...cmsData,
          clientId: "123",
          title: cmsData.title,
          shortDescription: cmsData.shortDescription,
          longDescription: cmsData.longDescription,
        };
        dispatch(onPostCms(Usersdata));
      } else {
        const updateusers = {
          enabled: true,
          deleted: false,
          createdBy: 0,
          updatedBy: 0,
          clientId: "123",
          id: Cmsprefilled?.id,
          title: cmsData?.title,
          shortDescription: cmsData.shortDescription,
          longDescription: cmsData.longDescription,
        };
        dispatch(onUpdateCms(updateusers));
      }
    }
  };
  useEffect(() => {
    if (getCmsData.postMessage?.data?.HttpStatusCode === "500") {
      setCmsData(resetCMSData);
      toast.error(getCmsData?.postMessage?.data?.ErrorMessage);
      dispatch(onPostCmsReset());
    } else if (getCmsData.post_status_code === "201") {
      toast.success(getCmsData.postMessage);
      setCmsData(resetCMSData);
      dispatch(onPostCmsReset());
      dispatch(onGetCms());
    } else if (getCmsData.post_status_code === 400) {
      toast.error(getCmsData.message);
      dispatch(onPostCmsReset());
    }
  }, [getCmsData]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCmsData({
      title: Cmsprefilled?.title || "",
      shortDescription: Cmsprefilled?.shortDescription || "",
      longDescription: Cmsprefilled?.longDescription || "",
    });
    setErrors({
      title: "",
      longDescription: "",
      shortDescription: "",
    });
  }, [Cmsprefilled]);
  useEffect(() => {
    if (getCmsData.update_status_code === "201") {
      toast.success(getCmsData.updateMessage);
      setCmsData(resetCMSData);
      dispatch(onUpdateCmsReset());
      setCmsprefilled("");
      dispatch(onGetCms());
    } else if (getCmsData.update_status_code === 400) {
      toast.error(getCmsData.updateMessage);
      setCmsData(resetCMSData);
      dispatch(onUpdateCmsReset());
    }
  }, [getCmsData]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              {getCmsData?.isLoading ? (
                <div style={{ height: "400px" }}>
                  <Loader classNameType={"absoluteLoader"} />
                </div>
              ) : (
                <>
                  <div className="card-header d-flex justify-content-between">
                    <h4 className="card-title">{cms}</h4>
                    <div className="col-sm-3 form-group mb-2">
                      <Dropdown
                        onChange={(e) => handleChange(e, "title")}
                        error={errors.title}
                        defaultSelected="Select Page Name"
                        value={cmsData.title}
                        className={` ${
                          errors.title ? "border-danger" : "form-select"
                        }`}
                        options={
                          Array.isArray(PageNames)
                            ? PageNames?.map((Pagename) => ({
                                label: Pagename,
                                value: Pagename,
                              }))
                            : []
                        }
                      />
                      <p className="text-danger">{errors.title}</p>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="form-group mb-2">
                      <label for="name-f">{ShortDescription}</label>

                      <textarea
                        name="textarea"
                        id="textarea"
                        cols="60"
                        rows="10"
                        className="form-control bg-transparent"
                        placeholder=""
                        value={cmsData.shortDescription}
                        onChange={(e) => handleChange(e, "shortDescription")}
                      ></textarea>
                      <p className="text-danger">{errors.shortDescription}</p>
                    </div>
                    <div className="form-group mb-2">
                      <label for="name-f">{LongDescription}</label>
                      <HtmlEditor
                        value={cmsData.longDescription}
                        onChange={(data) =>
                          handleHTMLChange(data, "longDescription")
                        }
                      />
                      <p className="text-danger">{errors.longDescription}</p>
                    </div>
                    <div className="form-group mb-0 mt-2">
                      <button
                        type="submit"
                        className="btn btn-primary float-right pad-aa"
                        onClick={handleSubmit}
                      >
                        {Cmsprefilled ? update : sumbit}
                        <i className="fa fa-arrow-right"></i>
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMSForm;
