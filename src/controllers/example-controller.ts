import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

interface CustomError {
  message: string;
}

export default class ExampleController {
  /**
   * @swagger
   * /api/examples:
   *   get:
   *     summary: Retrieve example data
   *     responses:
   *       200:
   *         description: An example GET endpoint
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   */
  async getExample(req: Request, res: Response): Promise<void> {
    try {
      res.send('GET example endpoint');
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: (error as CustomError).message,
      });
    }
  }

  /**
   * @swagger
   * /api/examples:
   *   post:
   *     summary: Create example data
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               data:
   *                 type: string
   *     responses:
   *       201:
   *         description: An example POST endpoint
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   */
  async postExample(req: Request, res: Response): Promise<void> {
    try {
      res.send('POST example endpoint');
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: (error as CustomError).message,
      });
    }
  }
}
