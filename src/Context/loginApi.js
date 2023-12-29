import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callLoginApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.loginApi,payload);
  return data;
};

