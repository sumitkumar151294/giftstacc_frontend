import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getByPromotionalIdApi = async (payload) => {
    debugger
  const { data = [] } = await axiosInstance.get(
    `${API.promotional_Allocate_brand_by_promotionalId}?PromotionalStripId=${payload}`
  );
  return data;
};

export const promotionalAllocateBrandPostApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(
    API.promotional_Allocate_brand,
    payload
  );
  return data;
};
export const promotionalAllocateBrandGetApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(
    API.promotional_Allocate_brand,
    payload
  );
  return data;
};

export const promotionalAllocateBrandPutApi = async (payload) => {
  const { data = [] } = await axiosInstance.put(
    API.promotional_Allocate_brand,
    payload
  );
  return data;
};
