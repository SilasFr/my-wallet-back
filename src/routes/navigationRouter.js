import { Router } from "express";
import {
  getBalanceSheet,
  postNewRegistry,
} from "../controllers/navigationController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

const balanceSheetRouter = Router();

balanceSheetRouter.get(
  "/balance-sheet",
  authorizationMiddleware,
  getBalanceSheet
);

balanceSheetRouter.put(
  "/balance-sheet/new-registry",
  authorizationMiddleware,
  postNewRegistry
);
export default balanceSheetRouter;
