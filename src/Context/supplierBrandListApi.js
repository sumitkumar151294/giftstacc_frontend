import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callSupplierBrandListUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.supplier_brandList, payload);
  return data;
};
export const callSupplierBrandListGetApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(`${API.supplier_brandList}?pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}`);
  return data;
};
