import { useSelector } from 'react-redux';

export const GetClientId = () => {
  return useSelector((state) => state?.loginAuthReducer?.data?.[0]?.clientId);
};

