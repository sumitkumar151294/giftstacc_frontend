import API from '../../Common/EndPoint/serviceConstrants';
import axiosInstanceClient from '../../Common/Axios/axiosInstanceClient';
export const callAddSpecialListPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.add_special, payload);
  return data;
};
export const callAddSpecialListGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.add_special);
  return data;
};
export const callAddSpecialListUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(API.add_special, payload);
  return data;
};