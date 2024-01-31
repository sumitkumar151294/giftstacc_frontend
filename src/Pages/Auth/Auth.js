import { useEffect, useState } from "react";
import { onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Components/Loader/Loader";
import PageError500 from "../../Components/PageError500/PageError500";
import { config } from "../../Common/Client/ClientConfig";

const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(true);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  console.log(loginAuthData?.httpStatusCode,"asdasfs");
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
    }
  }, [currentUrl]);

  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      debugger
      setShowLoader(false);
      setShowError(false);
      sessionStorage.setItem('clientCode', loginAuthData?.data?.[0]?.clientId)
      sessionStorage.setItem('token', loginAuthData?.data?.[0]?.token)
     dispatch(onTranslationSubmit());
    } else {
      setTimeout(() => {
        setShowLoader(false);
        setShowError(true);
      }, 5000);
    }
  }, [loginAuthData]);

  useEffect(() => {
    if (loginAuthData?.status_code === 200 || loginAuthData?.message === "") {
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
    if (translationData.status_code === 400) {
      setShowLoader(false);
      setShowError(false);
    } else {
      setShowLoader(true);
    }
  }, [translationData]);

  return (
    <>
     {showLoader ? <Loader /> : <>{showError ? <PageError500 /> : <RouteConfiq />}</>}
    </>
  );
};

export default Auth;
