import { useEffect, useState } from "react";
import { onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Componenets/Loader/Loader";
const Auth = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const translationData = useSelector((state) => state.translationReducer);
  useEffect(() => {
    dispatch(
      onLoginAuthSubmit({
        clientId: "1",
        partnerCode: "2",
        accessKey: "2",
        secretKey: "2",
      })
    );
    if (loginAuthData?.status_code === 200) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }

    localStorage.setItem("jwtToken", loginAuthData?.message);
    dispatch(onTranslationSubmit());
    if (translationData.status_code === 400) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [setShowLoader, dispatch]);
  return <>{showLoader && <Loader />}</>;
};
export default Auth;
