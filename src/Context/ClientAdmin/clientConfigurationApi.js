import API from "../../Common/EndPoint/serviceConstrants";
import api from "../../Common/Axios/axiosInstanceClient";
export const getClientConfigureApi = async () => {
  const { data = {} } = await api.get(API.clientconfiguration);
  return data;
};

export const postClientConfigureApi = async (payload) => {
  debugger
  const { data = {} } = await api.post(API.clientconfiguration,payload);
  debugger
  return data;
};

export const updateClientConfigureApi = async (payload) => {
    const { data = {} } = await api.put(API.clientconfiguration,payload);
    return data;
};

