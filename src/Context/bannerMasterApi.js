import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const bannerMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getBannerMaster);
  return data;
};

export const bannerMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postBannerMaster, payload);
  return data;
};


export const bannerMasterUpdateApi = async (payload) => {
    const { data = {} } = await axiosInstance.put(API.postBannerMaster, payload);
    return data;
  };
