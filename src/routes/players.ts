import { Router } from 'express';

import { getPlayerByPlayerId } from '../controllers/players';

const router = Router();
router.get('/rosters/:year', /* getAllPlayersByYear */);
router.get('/rosters/:year/results', /* getAllPlayerResults */);
router.get('/players/results', /* getAllPlayerResults */);
router.get('/players/:playerId', getPlayerByPlayerId);
router.get('/players/:playerId/results', /* getAllPlayerResults */);
router.get('/players/:playerId/results/:year/batting', /* getAllPlayerBattingResults */);
router.get('/players/:playerId/results/:year/pitching', /* getAllPlayerPitchingResults */);

export default router;