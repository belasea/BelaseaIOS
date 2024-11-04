import {bela} from '../api';

export const getReturnPolicyData = async () => {
  let returnPolicyJson;
  const res = await bela('/api/return-policy/');

  res.data.map(item => {
    returnPolicyJson = {
      title: item.title,
      description: item.description,
    };
  });

  return returnPolicyJson;
};
