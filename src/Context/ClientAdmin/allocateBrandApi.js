import API from '../../Common/EndPoint/serviceConstrants';
import axiosInstanceClient from '../../Common/Axios/axiosInstanceClient';
export const callAllocateBrandsPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.allocate_Brand, payload);
  return data;
};
export const callAllocateBrandsGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.allocate_Brand);
  return data;
};
export const callAllocateBrandsUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(API.allocate_Brand, payload);
  return data;
};