import { useEffect, useState } from "react";
import { onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Componenets/Loader/Loader";
const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  useEffect(() => {
    const id = loginAuthData?.data?.data;
    const clientId = id?.clientId;
    setShowLoader(true);
    dispatch(
      onLoginAuthSubmit({
        clientId: clientId,
        partnerCode: "UIClient",
        accessKey: 1,
        secretKey: 1,
      })
    );
  }, []);
  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      const bearerToken = loginAuthData?.data?.data;
      const token = bearerToken?.token;
      const clientId = bearerToken?.clientId;
      localStorage.setItem("jwt", token);
      localStorage.setItem("clientId", clientId);
      setShowLoader(false);
      dispatch(onTranslationSubmit());
    } else {
      setShowLoader(true);
    }
  }, [loginAuthData]);

  return <>{showLoader ? <Loader /> : <RouteConfiq />}</>;
};
export default Auth;
