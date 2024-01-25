import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const loginAuthApi = async (payload) => {
  debugger
  const { data = {} } = await axiosInstance.post(API.loginAuth, payload);
  return data;
};
