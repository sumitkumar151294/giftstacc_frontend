import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const translationApi = async () => {    
  const { data = {} } = await axiosInstance.get(API.translationApi);
  return data;
};