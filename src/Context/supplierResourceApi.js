import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postSupplierResourceApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(
    API.supplier_resource,
    payload
  );
  return data;
};

export const getSupplierResourceApi = async () => {
  const { data = {} } = await axiosInstance.get(API.supplier_resource);
  return data;
};
export const updateSupplierResourceApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(
    API.supplier_resource,
    payload
  );
  return data;
};
