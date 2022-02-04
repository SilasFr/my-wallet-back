import db from "../db.js";

async function getBalanceSheet(req, res) {
  const user = res.locals.user;

  try {
    const balanceSheet = await db
      .collection("balance-sheet")
      .findOne({ userId: session.userId });
    res.send({ user, balanceSheet });
  } catch (error) {
    res.send(500);
  }
}

export { getBalanceSheet };
