import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getClientPaymentApi = async () => {
  const { data = {} } = await axiosInstance.get(API.clientPayment_gateway);
  return data;
};

export const postClientPaymentApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(
    API.clientPayment_gateway,
    payload
  );
  return data;
};
export const updateClientPaymentApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(
    API.clientPayment_gateway,
    payload
  );
  return data;
};
