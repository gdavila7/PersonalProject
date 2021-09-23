import { Router } from 'express';
const router = Router();

import * as seriesCtrl from '../controllers/series.controller';

router.get('/series', seriesCtrl.getSeries);

router.post('/series', seriesCtrl.createSerie);

export default router;
