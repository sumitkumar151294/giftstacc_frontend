import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callCreateCategoryGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.createCategory);
  return data;
};

export const callCreateCategoryPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.createCategory,payload);
  return data;
};


