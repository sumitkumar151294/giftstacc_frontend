/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  onLoginAuthReset,
  onLoginAuthSubmit,
} from "../../Store/Slices/loginAuthSlice";
import {
  onTranslationReset,
  onTranslationSubmit,
} from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Components/Loader/Loader";
import PageError500 from "../../Components/PageError/PageError";
import { config } from "../../Common/Client/ClientConfig";
import axiosInstance from "../../Common/Axios/axiosInstance";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";
import { onPartnerKeyLoginSubmit } from "../../Store/Slices/loginSlice";
const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const translationData = useSelector((state) => state.translationReducer);
  const currentUrl = window.location.href;

  useEffect(() => {
    const isAuthInitialized = sessionStorage.getItem("isAuthInitialized");
    if (isAuthInitialized !== "true") {
      setShowLoader(true);
      // Find the configuration that matches the current URL
      let matchingConfig = config.filter((item) =>
        currentUrl.includes(item.API_URL)
      );

      if (matchingConfig.length > 1) {
        if (
          currentUrl.includes("/Lc-user-admin") ||
          currentUrl.includes("/lc-user-admin")
        ) {
          matchingConfig = matchingConfig.find(
            (item) => item.PARTNER_KEY === "UIClient"
          );
        } else {
          matchingConfig = matchingConfig.find(
            (item) => item.PARTNER_KEY === "UIAdmin"
          );
        }
      } else if (matchingConfig.length === 1) {
        matchingConfig = matchingConfig[0];
      }
      // get data from present url
      if (matchingConfig) {
        const { ACCESS_KEY, SECRET_KEY, PARTNER_KEY } = matchingConfig;
        dispatch(onPartnerKeyLoginSubmit(PARTNER_KEY));
        dispatch(onTranslationReset());
        dispatch(
          onLoginAuthSubmit({
            partnerCode: PARTNER_KEY,
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY,
          })
        );
        axiosInstance.defaults.headers["partner-code"] = PARTNER_KEY;
        axiosInstanceClient.defaults.headers["partner-code"] = PARTNER_KEY;
        sessionStorage.setItem("isAuthInitialized", "true");
      } else {
        setShowLoader(false);
        setShowError(true);
        setPageError({
          StatusCode: "401",
          ErrorName: "Permission Denied",
          ErrorDesription:
            "Your application url is not registerd to our application",
          url: "/",
          buttonText: "Back to Home",
        });
      }
    }
  }, [currentUrl]);

  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      sessionStorage.setItem("clientCode", loginAuthData?.data?.[0]?.clientId);
      axiosInstance.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
      axiosInstance.defaults.headers["client-code"] =
        loginAuthData?.data?.[0]?.clientId;
      axiosInstanceClient.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
      axiosInstanceClient.defaults.headers["client-code"] =
        loginAuthData?.data?.[0]?.clientId;
      dispatch(onTranslationSubmit());
      dispatch(onLoginAuthReset());
    } else if (loginAuthData?.status_code) {
      setShowError(true);
      setShowLoader(false);
      setPageError({
        StatusCode: loginAuthData?.status_code,
        ErrorName: "Internal Server Error",
        ErrorDesription: "You do not have permission to view this resource",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [loginAuthData]);

  useEffect(() => {
    if (translationData.status_code === 200 && !translationData?.isLoading) {
      setShowLoader(false);
      setShowError(false);
      dispatch(onTranslationReset());
    } else if (
      translationData?.status_code !== 200 &&
      translationData?.status_code
    ) {
      setShowError(true);
      setShowLoader(false);
      setPageError({
        StatusCode: "500",
        ErrorName: "Internal Server Error",
        ErrorDesription: "You do not have permission to view this resource",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [translationData]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {showError ? <PageError500 pageError={pageError} /> : <RouteConfiq />}
        </>
      )}
    </>
  );
};

export default Auth;
/* eslint-enable react-hooks/exhaustive-deps */
