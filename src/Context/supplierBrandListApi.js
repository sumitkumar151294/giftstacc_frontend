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
  let url;
  url = `${API.supplier_brandList}?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`;
  if (payload.enabled === 1) {
    url += "&enable=1";
  } else {
    url += "";
  }
  const { data = [] } = await axiosInstance.get(url);
  return data;
};
