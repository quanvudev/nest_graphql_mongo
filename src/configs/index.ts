// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
  port: process.env.PORT || 3000,
  database: {
    mongo: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '365d',
  },
  hash: {
    saltRounds: process.env.HASH_SALT_ROUNDS
      ? Number(process.env.HASH_SALT_ROUNDS)
      : 10,
  },
});
