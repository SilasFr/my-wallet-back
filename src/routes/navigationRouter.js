import { Router } from "express";
import { getBalanceSheet } from "../controllers/navigationController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

const balanceSheetRouter = Router();

balanceSheetRouter.get(
  "/balance-sheet",
  authorizationMiddleware,
  getBalanceSheet
);

export default balanceSheetRouter;
