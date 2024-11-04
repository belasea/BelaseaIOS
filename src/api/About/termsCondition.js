import {bela} from '../api';

export const getTermsConditionData = async () => {
  let termsConditionJson;

  const res = await bela('/api/terms-and-conditions/');

  res.data.map(item => {
    termsConditionJson = {
      title: item.title,
      description: item.description,
    };
  });

  return termsConditionJson;
};
