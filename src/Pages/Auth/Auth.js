import { useEffect, useState } from "react";
import { onLoginAuthReset, onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Components/Loader/Loader";
import PageError500 from "../../Components/PageError/PageError";
import { config } from "../../Common/Client/ClientConfig";

const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pageError, setPageError] = useState({StatusCode:"", ErrorName:"", ErrorDesription:"", url:"", buttonText:"" });
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const translationData = useSelector((state) => state.translationReducer);
  const currentUrl = window.location.href;

  useEffect(() => {
    setShowLoader(true);
    // Find the configuration that matches the current URL
    const matchingConfig = config.find((item) =>
      currentUrl.includes(item.API_URL)
    );
    // get data from present url
    if (matchingConfig) {
      const { ACCESS_KEY, SECRET_KEY, PARTNER_KEY } =
        matchingConfig;
      dispatch(
        onLoginAuthSubmit({
          partnerCode: PARTNER_KEY,
          accessKey: ACCESS_KEY,
          secretKey: SECRET_KEY,
        })
      );
    }else{
      setShowLoader(false);
      setShowError(true)
      setPageError({StatusCode:"401", ErrorName:"Permission Denied", ErrorDesription:"Your application url is not registerd to our application", url:"/", buttonText:"Back to Home" });
    }
  }, [currentUrl]);

  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      sessionStorage.setItem('clientCode', loginAuthData?.data?.[0]?.clientId)
      sessionStorage.setItem('token', loginAuthData?.data?.[0]?.token)
      dispatch(onTranslationSubmit());
      dispatch(onLoginAuthReset());
    }else if(loginAuthData?.status_code){
      setShowError(true);
      setShowLoader(false);
      setPageError({StatusCode:loginAuthData?.status_code, ErrorName:"Internal Server Error", ErrorDesription:"You do not have permission to view this resource", url:"/", buttonText:"Back to Home" });
    }
  }, [loginAuthData]);


  useEffect(() => {
    if (translationData.status_code === 200) {
      setShowLoader(false);
      setShowError(false);
    }else if(translationData?.status_code){
      setShowError(true);
      setShowLoader(false);
      setPageError({StatusCode:"500", ErrorName:"Internal Server Error", ErrorDesription:"You do not have permission to view this resource", url:"/", buttonText:"Back to Home" });
    }
  }, [translationData]);

  return (
    <>
     {showLoader ? <Loader /> : <>{showError ? <PageError500 pageError={pageError}  /> : <RouteConfiq />}</>}
    </>
  );
};

export default Auth;
