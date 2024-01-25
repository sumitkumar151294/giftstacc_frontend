import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const translationApi = async (clientId, token ) => {
    const { data = {} } = await axiosInstance.get(
    `${API.translationApi}?clientId=${clientId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
