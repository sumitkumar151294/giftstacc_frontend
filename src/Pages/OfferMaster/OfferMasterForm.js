import React,{useState,useEffect} from 'react';
import { GetTranslationData } from '../../Components/GetTranslationData/GetTranslationData ';
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { onPostOfferMasterSubmit ,onPostOfferMasterReset,onGetOfferMaster, onUpdateOfferMaster, onUpdateOfferMasterReset} from '../../Store/Slices/offerMasterSlice';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';

const OfferMasterForm = ({data,setData}) => {
  const [showLoader, setShowLoader] = useState(false);
  const [addData, setAddData]=useState({
    placement: '',
    title: '',
    subtitle: '',
    link: '',
    displayOrder: '',
    image: "",
    enabled:true
  })
  const [errors, setErrors] = useState({
    placement: '',
    title: '',
    subtitle: '',
    link: '',
    displayOrder: '',
    image: '',
    enabled:''
  });
  // To reset the Input Field
  const resetAddData={
    placement: '',
    title: '',
    subtitle: '',
    link: '',
    displayOrder: '',
    image: "",
    enabled:''
  }

  // To get the label from translation API
  const top=GetTranslationData("UIClient", "top");
  const bottom=GetTranslationData("UIClient", "bottom");
  const active=GetTranslationData("UIClient", "active_option");
  const non_active=GetTranslationData("UIClient", "non_active_option");
  const field_Required=GetTranslationData("UIAdmin", "field_Required");
  const placement=GetTranslationData("UIClient","placement");
  const title=GetTranslationData("UIClient", "title");
  const subtitle=GetTranslationData("UIClient", "sub-title");
  const link_label=GetTranslationData("UIClient","link_label");
  const display_order=GetTranslationData("UIClient", "display-order");
  const upload_image=GetTranslationData("UIClient", "uploadImage");
  const upload=GetTranslationData("UIClient", "upload");
  const status=GetTranslationData("UIClient", "status");
  const submit=GetTranslationData("UIClient", "submitLabel");
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
    if(fieldName==="enabled"){
      setAddData({
        ...addData,
        [fieldName]: e.target.value ==="true" ? true:false,
      });
    }
    else{
      setAddData({
         ...addData,
         [fieldName]: e.target.value,
      });
    }
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
      setShowLoader(true);
      if (!data) {
      try {
        dispatch(onPostOfferMasterSubmit(addData));
      } 
      catch (error) {
      }
    } else if (data) {
      try {
        const tempData = {...addData}
        tempData.id=data?.id
        dispatch(onUpdateOfferMaster(tempData));
      } 
      catch (error) {
      }
    }
    }
  };
  
  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     setAddData({
      ...addData,
      placement: data?.placement || "",
      title: data?.title || "",
      subtitle:data?.subtitle || "",
      link: data?.link || "",
      displayOrder: data?.displayOrder || "",
      // image: data?.image || "",
      enabled:data?.enabled || ""
     })
  },[data])

  useEffect(() => {
    if (offerMasterData?.status_code === "201") {
      setShowLoader(false);
      toast.success(offerMasterData?.message);
      dispatch(onPostOfferMasterReset());
      dispatch(onGetOfferMaster());
      setAddData(resetAddData);
    }
  }, [offerMasterData])
  useEffect(() => {
    if (offerMasterData.update_status_code === "201") {
      setShowLoader(false);
      toast.success(offerMasterData?.updateMessage);
      dispatch(onGetOfferMaster());
      dispatch(onUpdateOfferMasterReset());
      setAddData(resetAddData);
    }
  }, [offerMasterData]);

  useEffect(()=>{
    if(offerMasterData.status_code === "500"){
      setShowLoader(false);
      toast.error(offerMasterData.message);
      dispatch(onPostOfferMasterReset());
      setAddData(resetAddData);
    }
  },[offerMasterData])

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
                            {showLoader ? (
                              <div style={{ height: "400px" }}>
                                <Loader classType={"absoluteLoader"} />
                              </div>
                            ) : (
                                <div className="container-fluid">
                                  <form onSubmit={handleSubmit}>
                                    <div className="row">
                                      <div className="col-sm-3 form-group mb-2">
                                        <label htmlFor="placement">{placement}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Dropdown
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
                                        <label htmlFor="title">{title}
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
                                        <label htmlFor="subtitle">{subtitle}
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
                                        <label htmlFor="link">{link_label}
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
                                        <label htmlFor="displayOrder">{display_order}
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
                                        <label htmlFor="image">{upload_image}
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
                                          <span className="input-group-text">{upload}</span>
                                        </div>
                                      </div>
                                      <div className="col-sm-3 form-group mb-2">
                                        <label htmlFor="enabled">{status}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <Dropdown                                      
                                          value={addData.enabled}
                                          onChange={(e) => handleInputChange(e, "enabled")}
                                          className={` ${errors.enabled
                                            ? "border-danger"
                                            : "form-select"
                                            }`}
                                          options={statusoptions}
                                        />
                                      </div>
                                      <div className="col-sm-12 form-group mb-0 mt-2">
                                        <button className="btn btn-primary float-right pad-aa">{submit}<i className="fa fa-arrow-right"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                  <ToastContainer/>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OfferMasterForm;