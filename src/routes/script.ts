import { Router } from 'express';
import * as PageController from '../controllers/pageController';

const router = Router();

router.get('/ping', PageController.ping);

// TODO -> [X] Rota para ver todos os contatos
// TODO -> [X] Rota para ver um contato
// TODO -> [X] Rota para Adicionar novo contato
// TODO -> [X] Rota para deletar contato
// TODO -> [] Rota para editar contato

router.get('/contacts', PageController.getAllContacts);
router.post('/contacts', PageController.postContact);
router.get('/contacts/:id', PageController.getContact);
router.delete('/contacts/:id', PageController.deleteContact);
router.put('/contacts/:id', PageController.putContact);

export default router;
