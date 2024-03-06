import API from "../../Common/EndPoint/serviceConstrants";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

export const callCmsPostAPI = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postCMS, payload);
  return data;
};
export const callCmsgetAPI = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getCMS);
  return data;
};
export const callCmsupdateAPI = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(
    API.updateCMS,
    payload
  );
  return data;
};