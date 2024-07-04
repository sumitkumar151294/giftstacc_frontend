import API from '../../Common/EndPoint/serviceConstrants';
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

export const promotionalGetApi = async () => {
  const { data = [] } = await axiosInstanceClient.get(API.promotional_Get_api);
  return data;
};

export const promotionalPostApi = async (payload) => {
  const { data = [] } = await axiosInstanceClient.post(API.promotional_api, payload);
  return data;
};

export const promotionalUpdateApi = async (payload) => {
    const { data = [] } = await axiosInstanceClient.put(API.promotional_api, payload);
    return data;
  };