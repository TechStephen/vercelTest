import Redis, { RedisOptions } from 'ioredis';

// need to be type RedisOptions cant find online??
export const redis = new Redis(process.env.REDIS_URL)


