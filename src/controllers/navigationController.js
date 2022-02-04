import db from "../db.js";

async function getBalanceSheet(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.send(401);
  }

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    res.sendStatus(401);
    return;
  }

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });
    const balanceSheet = await db
      .collection("balance-sheet")
      .findOne({ userId: session.userId });
    res.send({ user, balanceSheet });
  } catch (error) {
    res.send(500);
  }
}

export { getBalanceSheet };
