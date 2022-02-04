import { Router } from "express";
import { getBalanceSheet } from "../controllers/navigationController.js";

const balanceSheetRouter = Router();

balanceSheetRouter.get("/balance-sheet", getBalanceSheet);

export default balanceSheetRouter;
