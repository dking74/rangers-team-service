import { Router } from 'express';

const router = Router();
router.get('/rosters/:year', /* getAllPlayersByYear */);
router.get('/rosters/:year/results', /* getAllPlayerResults */);
router.get('/players/results', /* getAllPlayerResults */);
router.get('/players/:playersId/results', /* getAllPlayerResults */);
router.get('/players/:playersId/results/:year/batting', /* getAllPlayerBattingResults */);
router.get('/players/:playersId/results/:year/pitching', /* getAllPlayerPitchingResults */);

export default router;