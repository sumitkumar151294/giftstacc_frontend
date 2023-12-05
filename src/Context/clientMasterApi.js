import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callClientMasterApi = async (payload) => {
  const { name, number, email, domain, dns, ipAddress, domainProvider, color, stagingKey, stagingSecretKey, productionKey, productionSecretKey } = payload;
  const { data = {} } = await axiosInstance.post(API.ClientMasterApi, { payload });
  return data;
};
