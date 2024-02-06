import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getClientPaymentApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getClientPayment);
  return data;
};

export const postClientPaymentApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(
    API.postClientPayment,
    payload
  );
  return data;
};
export const updateClientPaymentApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(
    API.updateClientPayment,
    payload
  );
  return data;
};
