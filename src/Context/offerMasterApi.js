import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callOfferMasterPostApi = async (payload) => {
    const { data = {} } = await axiosInstance.post(API.postOfferMaster, payload);
    return data;
  };
export const callOfferMasterGetApi = async () => {
    const { data = {} } = await axiosInstance.get(API.getOfferMaster);
    return data;
  };
  export const callOfferMasterUpdateApi = async (payload) => {
    const { data = {} } = await axiosInstance.put(API.updateOfferMaster, payload);
    return data;
  };
  