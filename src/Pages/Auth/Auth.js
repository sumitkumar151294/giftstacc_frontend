import { useEffect, useState } from "react";
import { onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import Loader from "../../Componenets/Loader/Loader";
import Error from "../../Componenets/Error/Error";

const Auth = () => {
  const dispatch = useDispatch();
  const[show,setShow]=useState(true)
  const [showLoader, setShowLoader] = useState(true);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const translationData = useSelector((state) => state.translationReducer);

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
      const bearerToken = loginAuthData?.data?.data;
      const token = bearerToken?.token;
      const clientId = bearerToken?.clientId;
      localStorage.setItem("jwt", token);
      localStorage.setItem("clientId", clientId);
      setShowLoader(false);
      dispatch(onTranslationSubmit());
    } else {
      setShowLoader(true);
     if(loginAuthData?.status_code === 400){
      setShowLoader(false);

     }
    }
  }, [loginAuthData]);
  useEffect(() => {
    if (translationData.status_code === 200) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
      if(translationData.status_code === 400){
        setShowLoader(false);

      }
     
    }
  }, [translationData]);

  return <>
  {showLoader ? <Error/> :<RouteConfiq/> }</>;
  
};
export default Auth;
