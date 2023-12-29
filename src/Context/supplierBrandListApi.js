import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callSupplierBrandListPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.supplierBrandListApi, payload);
  return data;
};
export const callSupplierBrandListGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.supplierBrandListApi);
  return data;
};
