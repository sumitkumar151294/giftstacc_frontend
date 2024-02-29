import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const faqMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getFaqMaster);
  return data;
};

export const faqMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postFaqMaster, payload);
  return data;
};


