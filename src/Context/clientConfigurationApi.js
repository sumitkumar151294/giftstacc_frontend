import API from "../Common/EndPoint/serviceConstrants";
import api from "../Common/Axios/axiosInstanceClient";
export const getPointsApi = async () => {
  const { data = {} } = await api.get(API.pointsApi);
  return data;
};

export const postPointsApi = async () => {
    const { data = {} } = await api.get(API.pointsApi);
    return data;
  };

