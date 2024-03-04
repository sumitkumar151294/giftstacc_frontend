import API from "../Common/EndPoint/serviceConstrants";
import axiosInstanceClient from "../Common/Axios/axiosInstanceClient";

export const bannerMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getBannerMaster);
  return data;
};

export const bannerMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postBannerMaster, payload);
  return data;
};


export const bannerMasterUpdateApi = async (payload) => {
    const { data = {} } = await axiosInstanceClient.put(API.postBannerMaster, payload);
    return data;
  };
