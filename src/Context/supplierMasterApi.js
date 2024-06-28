import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callSupplierMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.supplier_master, payload);
  return data;
};
export const callSupplierMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.supplier_master);
  return data;
};
export const updateSupplierMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.supplier_master,payload);
  return data;
};