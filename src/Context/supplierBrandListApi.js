import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callSupplierBrandListUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updateSupplierBrandListApi, payload);
  return data;
};
export const callSupplierBrandListGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.supplierBrandListApi);
  return data;
};
