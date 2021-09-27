// cache with redis helper
const logger = require('@condor-labs/logger');
import Series from '../models/SerieModel';

const { settings } = require('../config/redis_constans');
const redis = require('@condor-labs/redis')(settings);

const getClient = async () => {
  const client = await redis.getClient();
  const redisBatch = client.batch();
  return redisBatch;
};

export const cacheSerieId = async (req, res, next) => {
  logger.information({ info: 'Buscando serie en cache, sino buscar en mongo' });
  const redisClient = await getClient();
  const { id } = req.params;

  await redisClient.get(id);
  const [resolve] = await redisClient.execAsync();
  if (resolve) {
    res.json(JSON.parse(resolve));
  } else {
    next();
  }
};

export const getSeriesCache = async (req, res) => {
  logger.information({ info: 'Buscando serie en mongo y guardando en cache' });
  const redisClient = await getClient();
  const { id } = req.params;

  try {
    const data = await Series.findById(id);

    const dataString = JSON.stringify(data);

    redisClient.set(id, dataString);
    await redisClient.expire(id, 10);
    await redisClient.execAsync();

    return res.json(data);
  } catch (error) {
    return res.json({
      message: 'Serie not founded',
    });
  }
};
