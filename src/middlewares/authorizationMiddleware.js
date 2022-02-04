import db from "../db.js";

export default async function authorizationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    res.sendStatus(401);
    return;
  }

  const user = await db.collection("users").findOne({ _id: session.userId });
  if (!user) {
    res.sendStatus(401);
    return;
  }
  delete user.password;
  res.locals.user = user;

  next();
}
