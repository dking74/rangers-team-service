import { Router } from 'express';
import { getAllGames, getGameInfo } from '../controllers/games';

const router = Router();
router.get('/games', getAllGames);
router.get('/games/:gameId', getGameInfo);

/**
 * These are experimentation routes based on data available.
 * 
 * router.get('/games/:gameId/results/teams/batting', // getGameBattingDataForTeam);
 * router.get('/games/:gameId/results/teams/pitching', // getGamePitchingDataForTeam);
 * router.get('/games/:gameId/results/players/:playerId/batting', // getGameBattingDataForPlayer;
 * router.get('/games/:gameId/results/players/:playerId/pitching', // getGamePitchingDataForPlayer);
 */

export default router;