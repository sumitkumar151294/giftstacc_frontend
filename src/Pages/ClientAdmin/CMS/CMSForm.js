import React, { useEffect, useState } from "react";
import HtmlEditor from "../../../Components/HtmlEditor/HtmlEditor";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import {
  onGetCms,
  onPostCms,
  onPostCmsReset,
  onUpdateCms,
} from "../../../Store/Slices/cmsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";

const CMSForm = ({ Cmsprefilled, setCmsprefilled }) => {
  const sumbit = GetTranslationData("UIAdmin", "submit_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const dispatch = useDispatch();
  const getCMSdata = useSelector((state) => state.cmsReducer);
  const [cmsData, setCmsData] = useState({
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
  const handleChange = (e, fieldName) => {

    setCmsData({
      ...cmsData,
      [fieldName]: e.target?.value,
    });

    // Remove the error message when the user starts typing
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleHTMLChange = (html) => {
    setCmsData({
      ...cmsData,
      longDescription: html,
    });
  };

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
          title: cmsData.title,
          shortDescription: cmsData.shortDescription,
          longDescription: cmsData.longDescription,
        };
        dispatch(onPostCms(Usersdata));
      } else {
        debugger
        const updateusers = {
          enabled: true,
          deleted: false,
          createdBy: 0,
          updatedBy: 0,
          id:Cmsprefilled?.id,
          title:cmsData?.title,
          shortDescription:cmsData.shortDescription,
          longDescription:cmsData.longDescription
        };
        dispatch(onUpdateCms(updateusers))
      }
    }
  };
  const PageNames = [
    "About us",
    "Privacy Policy",
    "Terms and Conditions",
    "LC Loyality Program",
  ];

  useEffect(() => {
    if (getCMSdata.post_status_code === "201") {
      debugger
      toast.success(getCMSdata.postMessage);
      setCmsData(resetCMSData);
      dispatch(onPostCmsReset());
      dispatch(onGetCms());
    }
  }, [getCMSdata]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    debugger
    setCmsData({
      title: Cmsprefilled?.title || "",
      shortDescription: Cmsprefilled?.shortDescription || "",
      longDescription: Cmsprefilled?.longDescription || "",
    });
  }, [Cmsprefilled]);
  return (
    <>

      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <h4 class="card-title">
                  {GetTranslationData("UIClient", "cms")}
                </h4>
                <div class="dropdown-side">
                  <div class="form-group mb-2">
                    <select
                      class="form-select"
                      name="pageName"
                      value={cmsData.title}
                      onChange={(e) => handleChange(e, "title")}
                      aria-label="Default select example"
                    >
                      <option selected>
                        Select Page Name &nbsp;
                        <i class="fa fa-angle-down"></i>
                      </option>
                      {PageNames.map((Option, index) => (
                        <option key={index} value={Option}>
                          {Option}
                          &nbsp;
                          <i class="fa fa-angle-down"></i>
                        </option>
                      ))}
                    </select>
                    <p className="text-danger">{errors.title}</p>
                  </div>
                </div>
              </div>

              <div class="card-body">
              {isFormLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                <div class="form-group mb-2">
                  <label for="name-f">
                    {GetTranslationData("UIClient", "short_description")}
                  </label>
                  {console.log('cmsData.shortDescription',cmsData.shortDescription)}
                  <textarea
                    name="textarea"
                    id="textarea"
                    cols="60"
                    rows="10"
                    class="form-control bg-transparent"
                    placeholder=""
                    value={cmsData.shortDescription}
                    onChange={(e) => handleChange(e, "shortDescription")}
                  ></textarea>
                  <p className="text-danger">{errors.shortDescription}</p>
                </div>
                )}
                <div class="form-group mb-2">
                  <label for="name-f">
                    {GetTranslationData("UIClient", "long_description")}
                  </label>
                  <HtmlEditor
                    value={cmsData.longDescription}
                    onChange={handleHTMLChange}
                  />
                  <p className="text-danger">{errors.longDescription}</p>
                </div>
                <div class="form-group mb-0 mt-2">
                  <button
                    type="submit"
                    class="btn btn-primary float-right pad-aa"
                    onClick={handleSubmit}
                  >
                    {Cmsprefilled ? update : sumbit}
                    <i class="fa fa-arrow-right"></i>
                  </button>
                  <ToastContainer />

                                  </div>
              </div>
            </div>
          </div>
            </div>
        </div>
        </>
  );
};

export default CMSForm;
