import React,{useState,useEffect} from 'react';
import { GetTranslationData } from '../../Components/GetTranslationData/GetTranslationData ';
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { onPostOfferMasterSubmit ,onPostOfferMasterReset,onGetOfferMaster} from '../../Store/Slices/offerMasterSlice';
import { ToastContainer, toast } from 'react-toastify';

const OfferMasterForm = ({data,setData}) => {
  console.log(data, "asdsd")
  const [addData, setAddData]=useState({
    placement: '',
    title: '',
    subtitle: '',
    link: '',
    displayOrder: '',
    image: "",
    status: '',
  })
  const [errors, setErrors] = useState({
    placement: '',
    title: '',
    subtitle: '',
    link: '',
    displayOrder: '',
    image: '',
    status: '',
  });
  // To reset the Input Field
  const resetAddData={
    placement: '',
    title: '',
    subtitle: '',
    link: '',
    displayOrder: '',
    image: "",
    status: '',
  }

  // To get the label from translation API
  const top=GetTranslationData("UIClient", "top");
  const bottom=GetTranslationData("UIClient", "bottom");
  const active=GetTranslationData("UIClient", "active_option");
  const non_active=GetTranslationData("UIClient", "non_active_option");
  const field_Required=GetTranslationData("UIAdmin", "field_Required");
  const dispatch = useDispatch();
  const offerMasterData = useSelector((state) => state.offerMasterReducer);

  const placementoptions = [
    { value: "Top", label: top },
    { value: "Bottom", label: bottom },
  ];    
  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];  

  const handleInputChange = (e,fieldName) => {
    setAddData({
      ...addData,
      [fieldName]: e.target.value,
    });
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    for (const key in addData) {
      if (addData[key] === "") {
        newErrors[key] = { field_Required };
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if(isValid){
      dispatch(onPostOfferMasterSubmit(addData));       
    }
  };
  
  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     setAddData({
      placement: data?.placement || "",
      title: data?.title || "",
      subtitle:data?.subtitle || "",
      link: data?.link || "",
      displayOrder: data?.displayOrder || "",
      // image: data?.image || "",
      status: data?.status || "",
     })
  },[data])

  useEffect(() => {
    if (offerMasterData?.status_code === "201") {
      toast.success(offerMasterData?.message);
      dispatch(onPostOfferMasterReset());
      dispatch(onGetOfferMaster());
      setAddData(resetAddData);
    }
  }, [offerMasterData])

    return(
        <>           
              <div className="container-fluid">               
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">{GetTranslationData("UIClient", "offerMaster")}</h4>
                            </div>                           
                            <div className="card-body ">
                                <div className="container-fluid">
                                  <form onSubmit={handleSubmit}>
                                    <div className="row">
                                      <div className="col-sm-3 form-group mb-2">
                                        <label htmlFor="placement">{GetTranslationData("UIClient","placement")}    <span className="text-danger">*</span>
                                        </label>
                                        <Dropdown
                                          error=""
                                          value={addData.placement || ""}
                                          onChange={(e) => handleInputChange(e, "placement")}
                                          className={` ${errors.placement
                                            ? "border-danger"
                                            : "form-select"
                                            }`}
                                          options={placementoptions}
                                        />
                                      </div>
                                      <div className="col-sm-5 form-group mb-2">
                                        <label htmlFor="title">{GetTranslationData("UIClient", "title")}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <InputField
                                          type="text"
                                          value={addData.title}
                                          onChange={(e) => handleInputChange(e, "title")}
                                          className={` ${errors.title
                                            ? "border-danger"
                                            : "form-control"
                                            }`}
                                          name="title"
                                          id="title"
                                          placeholder=""
                                        />
                                      </div>
                                      <div className="col-sm-4 form-group mb-2">
                                        <label htmlFor="subtitle">{GetTranslationData("UIClient", "sub-title")}
                                           <span className="text-danger">*</span>
                                        </label>
                                        <InputField
                                          type="text"
                                          value={addData.subtitle}
                                          onChange={(e) => handleInputChange(e, "subtitle")}
                                          className={` ${errors.subtitle
                                            ? "border-danger"
                                            : "form-control"
                                            }`}
                                          name="subtitle"
                                          id="subtitle"
                                          placeholder=""
                                        />
                                      </div>
                                      <div className="col-sm-5 form-group mb-2">
                                        <label htmlFor="link">{GetTranslationData("UIClient","link_label")}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <InputField
                                          type="text"
                                          value={addData.link}
                                          onChange={(e) => handleInputChange(e, "link")}
                                          className={` ${errors.link
                                            ? "border-danger"
                                            : "form-control"
                                            }`}
                                          name="link"
                                          id="link"
                                          placeholder=""
                                        />
                                      </div>
                                      <div className="col-sm-3 form-group mb-2">
                                        <label htmlFor="displayOrder">{GetTranslationData("UIClient", "display-order")}
                                           <span className="text-danger">*</span>
                                        </label>
                                        <InputField
                                          type="text"
                                          value={addData.displayOrder}
                                          onChange={(e) => handleInputChange(e, "displayOrder")}
                                          className={` ${errors.displayOrder
                                            ? "border-danger"
                                            : "form-control"
                                            }`}
                                          name="displayOrder"
                                          id="displayOrder"
                                          placeholder=""
                                        />
                                      </div>
                                      <div className="col-sm-4 form-group mb-2">
                                        <label htmlFor="image">{GetTranslationData("UIClient", "uploadImage")}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <div className="form-file">
                                            <InputField
                                              type="file"
                                              value={addData.image}
                                              className={` ${errors.image
                                                ? "border-danger"
                                                : "form-file-input form-control"}`}
                                                onChange={(e) => handleInputChange(e, "image")}
                                            />
                                          </div>
                                          <span className="input-group-text">{GetTranslationData("UIClient", "upload")}</span>
                                        </div>
                                      </div>
                                      <div className="col-sm-3 form-group mb-2">
                                        <label htmlFor="status">{GetTranslationData("UIClient", "status")}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <Dropdown
                                          error=""
                                          value={addData.status || ""}
                                          onChange={(e) => handleInputChange(e, "status")}
                                          className={` ${errors.status
                                            ? "border-danger"
                                            : "form-select"
                                            }`}
                                          options={statusoptions}
                                        />
                                      </div>
                                      <div className="col-sm-12 form-group mb-0 mt-2">
                                        <button className="btn btn-primary float-right pad-aa">{GetTranslationData("UIClient", "submit")} <i className="fa fa-arrow-right"></i></button>
                                      </div>
                                    </div>
                                  </form>
                                  <ToastContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OfferMasterForm;