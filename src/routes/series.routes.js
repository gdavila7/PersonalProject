import { Router } from 'express';
const router = Router();
//import * as cache from '../middlewares/cache'; // cache without redis helper
import * as cache from '../middlewares/cacheredis'; //cache with redis helper

import * as seriesCtrl from '../controllers/series.controller';

router.get('/series', seriesCtrl.getSeries);

router.post('/series', seriesCtrl.createSerie);

router.get('/series/:id', [cache.cacheSerieId, cache.getSeriesCache]);

export default router;
