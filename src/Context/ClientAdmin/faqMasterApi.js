import API from "../../Common/EndPoint/serviceConstrants";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

export const faqMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getFaqMaster);
  return data;
};

export const faqMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postFaqMaster, payload);
  return data;
};


