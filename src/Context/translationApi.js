import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const translationApi = async () => {
  const token = localStorage.getItem("jwt");
  const { data = {} } = await axiosInstance.get(
    API.translationApi + "?clientId=1&token=" + token
  );
  return data;
};
