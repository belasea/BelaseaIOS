import {bela} from '../api';

export const getSecurityPrivacyData = async () => {
  let securityPrivacyJson;

  const res = await bela('/api/security-privacy/');

  res.data.map(item => {
    securityPrivacyJson = {
      title: item.title,
      description: item.description,
    };
  });

  return securityPrivacyJson;
};
