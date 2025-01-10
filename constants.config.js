
export default {
  MONGO_URI: process.env.MONGO_URI,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  PAGINATION: {
    ITEMS_PER_PAGE: 10,
  },
  MAIL: {
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    USER: process.env.MAIL_USER,
    PASSWORD: process.env.MAIL_PASSWORD,
  },
};
