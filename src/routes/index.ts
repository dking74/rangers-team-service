import { Router } from 'express';

import GamesRouter from './games';
import PlayersRouter from './players';
import TeamsRouter from './teams';

const router = Router();
router.use(GamesRouter);
router.use(PlayersRouter);
router.use(TeamsRouter);

export default router;