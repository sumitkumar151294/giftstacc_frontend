import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const callProductByIdApi= async (payload) => {
  const { data = [] } = await axiosInstance.get(
    `${API.product_By_Id}?clientId=${payload.id[0]?.id}&pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`
  );
  return data;
};

