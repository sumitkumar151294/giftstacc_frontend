import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postSupplierResourceApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(
    API.postSupplierResource,
    payload
  );
  return data;
};

export const getSupplierResourceApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getSupplierResource);
  return data;
};
export const updateSupplierResourceApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(
    API.updateSupplierResource,
    payload
  );
  return data;
};
