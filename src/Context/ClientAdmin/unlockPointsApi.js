import API from '../../Common/EndPoint/serviceConstrants';
import axiosInstanceClient from '../../Common/Axios/axiosInstanceClient';
export const callUnlockPointsPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.staticpoints, payload);
  return data;
};
export const callUnlockPointsGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.staticpoints);
  return data;
};
export const callUnlockPointsUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(API.staticpoints, payload);
  return data;
};