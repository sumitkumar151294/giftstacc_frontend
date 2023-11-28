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
    setShowLoader(true);
    dispatch(
      onLoginAuthSubmit({
        clientId: 5,
        partnerCode: "UIClient",
        accessKey: 1,
        secretKey: 1,
      })
    );
  }, []);
  useEffect(() => {
    if (loginAuthData?.status_code === 200) {
      const bearerToken = loginAuthData?.message;
      const tokenIdIndex = bearerToken.indexOf("Token:");
      const token = bearerToken.substring(tokenIdIndex + 7).trim();
      localStorage.setItem("jwt", token);
      setShowLoader(false);
      dispatch(onTranslationSubmit());
    } else {
      setShowLoader(true);
    }
  }, []);

  return <>{showLoader ? <Loader /> : <RouteConfiq />}</>;
};
export default Auth;
