import { Router } from 'express';

import {
  getAllTeamPersonnel,
  getAllTeamResults,
  getAllTeamStats
} from '../controllers/teams';

const router = Router();
router.get('/teams/personnel', getAllTeamPersonnel);
router.get('/teams/results', getAllTeamResults);
router.get('/teams/stats', getAllTeamStats);

export default router;