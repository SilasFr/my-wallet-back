import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

async function signUp(req, res) {
  try {
    await db
      .collection("users")
      .insertOne({ ...user, password: bcrypt.hashSync(user.password, 10) });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function signIn(req, res) {
  const user = res.locals.user;

  try {
    const token = uuid();
    await db.collection("sessios").insertOne({ userId: user._id, token });
    res.send(token);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { signIn, signUp };
