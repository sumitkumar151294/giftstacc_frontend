import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getBrandCatalogue = async () => {
  const { data = {} } = await axiosInstance.get(API.getAll_brands);
  return data;
};


