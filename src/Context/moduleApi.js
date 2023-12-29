import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callModuleApi = async () => {
  const { data = {} } = await axiosInstance.get(API.moduleApi);
  return data;
};
