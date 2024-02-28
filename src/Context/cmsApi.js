import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const callCmsPostAPI = async (payload) => {
  debugger
  const { data = {} } = await axiosInstance.post(API.postCMS, payload);
  return data;
};
export const callCmsgetAPI = async () => {
  const { data = {} } = await axiosInstance.get(API.postCMS);
  return data;
};