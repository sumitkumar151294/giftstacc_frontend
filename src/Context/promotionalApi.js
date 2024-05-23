import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const promotionalGetApi = async () => {
  const { data = [] } = await axiosInstance.get(API.promotional_api);
  return data;
};

export const promotionalPostApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.promotional_api, payload);
  return data;
};

export const promotionalUpdateApi = async (payload) => {
    const { data = [] } = await axiosInstance.put(API.promotional_api, payload);
    return data;
  };