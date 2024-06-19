import { Request, Response } from 'express';
import UserService from '../services/user-service';
import HttpStatus from 'http-status-codes';

interface CustomError {
    message: string;
}

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Retrieve all users
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: (error as CustomError).message,
            });
        }
    }

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       201:
     *         description: The created user
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     */
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email } = req.body;
            const user = await this.userService.createUser(name, email);
            res.status(HttpStatus.CREATED).json(user);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: (error as CustomError).message,
            });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     summary: Delete a user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: No content
     */
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(parseInt(id));
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: (error as CustomError).message,
            });
        }
    }
}
