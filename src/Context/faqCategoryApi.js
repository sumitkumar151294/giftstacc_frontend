import API from "../Common/EndPoint/serviceConstrants";
import axiosInstanceClient from "../Common/Axios/axiosInstanceClient";

export const faqCategoryGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getFaqCategory);
  return data;
};

export const faqCategoryPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postFaqCategory, payload);
  return data;
};


