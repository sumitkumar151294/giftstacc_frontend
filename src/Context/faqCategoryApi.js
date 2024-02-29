import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const faqCategoryGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getFaqCategory);
  return data;
};

export const faqCategoryPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postFaqCategory, payload);
  return data;
};

export const faqCategoryUpdateApi = async (payload) => {
    const { data = {} } = await axiosInstance.put(API.updateFaqCategory, payload);
    return data;
  };

