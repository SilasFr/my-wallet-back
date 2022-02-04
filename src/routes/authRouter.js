import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import validateUserScheemaMiddleware from "../middlewares/validateUserMiddleware.js";
import validateUserSignInMiddleware from "../middlewares/validateUserSignInMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateUserScheemaMiddleware, signUp);

authRouter.post("/sign-in", validateUserSignInMiddleware, signIn);

export default authRouter;
