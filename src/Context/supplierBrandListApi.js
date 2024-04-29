import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const callSupplierBrandListUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(
    API.supplier_brandList,
    payload
  );
  return data;
};
export const callSupplierBrandListGetApi = async (payload) => {
  let url =payload.isCategory ? API.getAllproduct : payload.enabled?`${API.supplier_brandList}?pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}`:`${API.supplier_brandList}?pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}&enable=${1}`
    const { data = [] } = await axiosInstance.get(url);
    return data;
};
