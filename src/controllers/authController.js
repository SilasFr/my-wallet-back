import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

async function signIn(req, res) {
  const user = req.body;
  const validation = signupSchema.validate(user);
  if (validation.error) {
    res.send(401);
  }
  try {
    console.log(req.body);
    // criar collection e alocar usuários
    await db.collection("users").insertOne(user);
    res.send(201);
  } catch (error) {
    console.log(error);
  }
}

export { signIn };
