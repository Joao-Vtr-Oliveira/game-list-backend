import { Router, Request, Response } from 'express';
import * as PageController from '../controllers/pageController';
import { Contato } from '../models/Contato';

const router = Router();

router.get('/ping', PageController.ping);

// ! Apenas um teste temporário
router.get('/', async (req: Request, res: Response) => {
  let contatos = await Contato.findAll();
  res.send({contatos})
})

export default router;