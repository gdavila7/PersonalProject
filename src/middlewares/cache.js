//cache without redis helper

const redis = require('redis');
const redisClient = redis.createClient();
import Series from '../models/SerieModel';

redisClient.on('error', (error) => {
  console.log(error);
});

export const cacheSerieId = async (req, res, next) => {
  const { id } = req.params;

  redisClient.get(id, (err, data) => {
    if (err) {
      throw err;
    }

    if (data) {
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

export const getSeriesCache = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Series.findById(id);
    const dataString = JSON.stringify(data);

    redisClient.setex(id, 2600, dataString);
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
