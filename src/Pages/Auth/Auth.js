import { useEffect, useState } from "react";
import { onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Components/Loader/Loader";
import { config } from "../../Common/Client/ClientConfig";
import Error from "../../Components/Error/Error";

const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const translationData = useSelector((state) => state.translationReducer);
  const currentUrl = window.location.href;
  const loginAuthDataS = useSelector((state) => state.loginAuthReducer.data.data);
console.log(loginAuthDataS)

  useEffect(() => {
    setShowLoader(true);
    // Find the configuration that matches the current URL
    const matchingConfig = config.find((item) =>
      currentUrl.includes(item.API_URL)
    );
    // get data from present url
    if (matchingConfig) {
      const { ACCESS_KEY, SECRET_KEY, CLIENT_KEY, PARTNER_KEY } =
        matchingConfig;
      dispatch(
        onLoginAuthSubmit({
          clientId: CLIENT_KEY,
          partnerCode: PARTNER_KEY,
          accessKey: ACCESS_KEY,
          secretKey: SECRET_KEY,
        })
      );
    }
  }, [currentUrl]);

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
  }, [loginAuthData]);

  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      setShowLoader(false);
      setShowError(false);
    } else {
      setTimeout(() => {
        setShowLoader(false);
        setShowError(true);
      }, 5000);
    }
  }, [showError]);

  useEffect(() => {
    debugger
    if (translationData.status_code === 200) {
      setShowLoader(false);
      setShowError(false);
    } else {
      setShowLoader(true);
    }
  }, [translationData, showError]);

  return (
    <>
     {showLoader ? <Loader /> : <>{showError ? <Error /> : <RouteConfiq />}</>}
    </>
  );
};

export default Auth;
