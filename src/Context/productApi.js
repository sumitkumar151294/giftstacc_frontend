import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callProductByIdApi = async (payload) => {
  const { data = [] } = await axiosInstance.get(
    payload.id ?
      `${API.product_By_Id}?clientId=${payload.id}&pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}` : `${API.product_By_Id}?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`
  );
  return data;
};
