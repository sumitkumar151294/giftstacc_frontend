import API from "../../Common/EndPoint/serviceConstrants";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

export const bannerMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.banner_master);
  return data;
};

export const bannerMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.banner_master, payload);
  return data;
};


export const a = async (payload) => {
    const { data = {} } = await axiosInstanceClient.put(API.banner_master, payload);
    return data;
  };
