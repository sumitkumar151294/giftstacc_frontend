import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const clientProductMappingGetApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(
    `${API.client_product_mapping}?clientId=${payload}`
  );
  return data;
};

export const clientProductMappingPostApi = async (payload) => {
  const { data = [] } = await axiosInstance.post(
    API.client_product_map,
    payload
  );
  return data;
};
export const AllclientProductMappingGetApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(
    API.client_product_map,
    payload
  );
  return data;
};

export const clientProductMappingUpdateApi = async (payload) => {
  const { data = [] } = await axiosInstance.put(
    API.client_product_map,
    payload
  );
  return data;
};
