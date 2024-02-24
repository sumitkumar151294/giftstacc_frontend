import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const callCmsPostAPI = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.createCategory, payload);
  return data;
};

