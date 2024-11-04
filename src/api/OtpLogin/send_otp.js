import {bela} from '../api';

export const send_otp_to_user_api = async phone => {
  const res = await bela.get(`/account/api/send-otp-to-user/${phone}/`);
  return res.data;
};
