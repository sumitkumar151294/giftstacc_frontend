import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callSupplierMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.supplierMasterApi, payload);
  return data;
};
export const callSupplierMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.supplierMasterApi);
  return data;
};