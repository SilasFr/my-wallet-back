import db from "../db.js";

async function getBalanceSheet(req, res) {
  const user = res.locals.user;

  try {
    const balanceSheet = await db
      .collection("balance-sheets")
      .findOne({ userId: user._id });
    res.send({ user, balanceSheet });
  } catch (error) {
    res.sendStatus(500);
  }
}

async function postNewRegistry(req, res) {
  const user = res.locals.user;

  try {
    await db
      .collection("balance-sheets")
      .updateOne({
        $push: { balanceSheet: { ...req.body, date: Date.now() } },
      });
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getBalanceSheet, postNewRegistry };
