import {bela} from '../api';

export const getAboutData = async () => {
  let aboutJson;
  const res = await bela('/api/about-us/');

  res.data.map(item => {
    aboutJson = {
      title: item.title,
      description: item.description,
    };
  });

  return aboutJson;
};
