import { Router } from 'express';
import * as PageController from '../controllers/pageController';

const router = Router();

router.get('/ping', PageController.ping);

router.get('/contacts', PageController.getAllContacts);
router.post('/contacts', PageController.postContact);
router.get('/contacts/:id', PageController.getContact);
router.delete('/contacts/:id', PageController.deleteContact);
router.put('/contacts/:id', PageController.putContact);

export default router;
