import API from '../Common/EndPoint/serviceConstrants';
import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';

export const callOfferMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postOfferMaster, payload);
  return data;
};
export const callOfferMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getOfferMaster);
  return data;
};
export const callOfferMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(API.updateOfferMaster, payload);
  return data;
};
