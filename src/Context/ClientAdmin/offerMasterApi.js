import API from "../../Common/EndPoint/serviceConstrants";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

export const callOfferMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(
    API.offer_master,
    payload
  );
  return data;
};
export const callOfferMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.offer_master);
  return data;
};
export const callOfferMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(
    API.offer_master,
    payload
  );
  return data;
};
export const onUploadImageApi = async (payload) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data = [] } = await axiosInstanceClient.post(
      API.upload_Img,
      payload,
      config
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
