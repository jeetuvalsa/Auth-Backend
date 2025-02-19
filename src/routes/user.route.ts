import { Router, Request, Response } from "express";
import { loginUser, registerUser, getUser, userRefreshToken } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/user.middleware";

const router = Router();

router.post("/register", registerUser as any);
router.post("/login", loginUser as any);
router.get("/user", authenticateUser as any, getUser as any);
router.post("/refresh-token", userRefreshToken as any);

export default router;
