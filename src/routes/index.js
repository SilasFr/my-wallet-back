import { Router } from "express";
import authRouter from "./authRouter.js";
import balanceSheetRouter from "./navigationRouter.js";

const router = Router();
router.use(authRouter);
router.use(balanceSheetRouter);

export default router;
