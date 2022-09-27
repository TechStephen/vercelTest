import { redis } from './redis';

/**
 * This function gets data passed in and checks the redis cache db using '.get()' to see if it already exists,
 * if it does - it returns that data and voids fetcher (api getter). If it doesnt, it then sets the data to our 
 * cache db by first calling the fetcher function to get the data from the API (chech set function) and then setting 
 * it to our db using'.set()' in our set function below
 * 
 * @param key to get/set data by depending on if already in cache db
 * @param fetcher function to call api and get data 
 * @param expires when cached data expires
 * 
 * @returns value of data if catched, or returns a function to set data in cash db is doesnt exist (null)
 */
const fetch = async <T>(key: string, fetcher: () => T, expires: number) => {
  const existing = await get<T>(key);
  if (existing !== null) return existing;
  return set(key, fetcher, expires);
};

const get = async <T>(key: string): Promise<T | null> => {
  const value = await redis.get(key);
  if (value === null) return null;
  return JSON.parse(value);
};

const set = async <T>(key: string, fetcher: () => T, expires: number) => {
  const value = await fetcher();
  await redis.set(key, JSON.stringify(value), "EX", expires);
  return value;
};

const del = async (key: string) => {
  await redis.del(key);
};

export default { fetch, set, get, del };