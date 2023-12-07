import { useEffect, useState } from "react";
import { onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Componenets/Loader/Loader";
import Error from "../../Componenets/Error/Error";

const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const translationData = useSelector((state) => state.translationReducer);
  const adminAccessKey = process.env.REACT_APP_ADMIN_ACCESS_KEY;
  const adminSecretKey = process.env.REACT_APP_ADMIN_SECRET_KEY;
  const clientKey = process.env.REACT_APP_ADMIN_CLIENT_KEY;
  const partnerKey = process.env.REACT_APP_ADMIN_PARTNER_KEY;
  const currentUrl =window.location.href ;
  const adminUrl =process.env.REACT_APP_ADMIN_API_URL

  useEffect(() => {
        setShowLoader(true);
  if(currentUrl === adminUrl){
    dispatch(
      onLoginAuthSubmit({
      clientId: clientKey,
      partnerCode: partnerKey,
      accessKey: adminAccessKey,
        secretKey: adminSecretKey,
      })
    );
  }}, []);
  
  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      setShowLoader(false);
      setShowError(false);
      dispatch(onTranslationSubmit());
    } else {
      setTimeout(() => {
        setShowLoader(false);
        setShowError(true);
      }, 5000);
    }
  }, [loginAuthData, showError]);

  useEffect(() => {
    if (translationData.status_code === 200) {
      setShowLoader(false);
      setShowError(false);
    } else {
      setShowLoader(true);
    }
  }, [translationData, showError]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {showError ? (
            <Error />
          ) : (
            <RouteConfiq />
          )}
        </>
      )}
    </>
  );
};

export default Auth;
