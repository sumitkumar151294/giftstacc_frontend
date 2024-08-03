import API from "../Common/EndPoint/serviceConstrants";
import api from "../Common/Axios/axiosInstanceClient";
export const getPointsApi = async () => {
  const { data = {} } = await api.get(API.pointsApi);
  return data;
};

export const postPointsApi = async (payload) => {
    const { data = {} } = await api.get(API.pointsApi,payload);
    return data;
  };

  export const updatePointsApi = async (payload) => {
    const { data = {} } = await api.put(API.pointsApi,payload);
    return data;
  };

