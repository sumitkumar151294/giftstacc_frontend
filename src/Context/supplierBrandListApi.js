import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callSupplierBrandListUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.supplier_brandList, payload);
  return data;
};
export const callSupplierBrandListGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.supplier_brandList);
  return data;
};
