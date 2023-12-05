import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const translationApi = async () => {
  const token = localStorage.getItem("jwt");
  const clientId = localStorage.getItem("clientId");
  const { data = {} } = await axiosInstance.get(
    `${API.translationApi}?clientId=${clientId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
