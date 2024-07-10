import { Router } from 'express';
import {
  ping,
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from '../controllers/gameController';

const router = Router();

router.get('/ping', ping);

router.get('/games', getAllGames);
router.get('/games/:id', getGameById);
router.post('/games', createGame);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);

export default router;
