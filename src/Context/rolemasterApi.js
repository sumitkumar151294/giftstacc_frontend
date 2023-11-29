import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';

export const rolemasterApi = async (formData) => {
  try {
    const response = await axiosInstance.post(API.rolemasterApi, formData);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
