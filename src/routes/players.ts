import { Router } from 'express';

import {
  getAllPlayers,
  getPlayerByPlayerId,
  getPlayerTeamCareerAverages,
  getYearlyPlayerResults,
} from '../controllers/players';
import PlayerIdMiddleware from '../middleware/players';

const router = Router();
router.get('/players', getAllPlayers);
router.get('/players/:playerId', [PlayerIdMiddleware], getPlayerByPlayerId);
router.get('/players/:playerId/results', [PlayerIdMiddleware], getYearlyPlayerResults);
router.get('/players/:playerId/results/averages',[PlayerIdMiddleware], getPlayerTeamCareerAverages)

export default router;