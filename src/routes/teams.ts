import { Router } from 'express';

const router = Router();
router.get('/teams/management', /* getAllTeamManagement */);
router.get('/teams/management/:year', /* getAllTeamManagementByYear */);
router.get('/teams/coaches', /* getAllTeamCoaches */);
router.get('/teams/coaches/:year', /* getAllTeamCoachesByYear */);
router.get('/teams/results', /* getAllTeamResults */);
router.get('/teams/results/:year', /* getTeamResultsByYear */);
router.get('/teams/results/:year', /* getTeamResultsByYear */);
router.get('/teams/results/:year/batting', /* getTeamBattingResultsByYear */);
router.get('/teams/results/:year/pitching', /* getTeamPitchingResultsByYear */);

export default router;