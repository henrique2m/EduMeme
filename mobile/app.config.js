import 'dotenv/config';

export default {
  name: 'edumemem',
  version: '1.0.0',
  extra: {
    enableComments: process.env.COOLAPP_COMMENTS === 'true',
  },
};
