import { Router } from 'express';
import ExampleController from '../controllers/example-controller';

const router = Router();
const exampleController = new ExampleController();

router.get('/examples', (req, res) => exampleController.getExample(req, res));
router.post('/examples', (req, res) => exampleController.postExample(req, res));

export default router;
