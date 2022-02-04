import db from "../db.js";
import bcrypt from "bcrypt";

export default async function validateUserSignInMiddleware(req, res, next) {
  const user = await db.collection("users").findOne({ email: req.body.email });
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const validatePw = bcrypt.compareSync(req.body.password, user.password);
  if (!validatePw) {
    res.sendStatus(401);
    return;
  }
  res.locals.user = user;
  next();
}
