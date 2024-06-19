import { Router } from 'express';
import UserController from '../controllers/user-controller.js';

const router = Router();
const userController = new UserController();

router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

export default router;
