import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import joi from "joi";

const signupSchema = joi.object({
  name: joi.string().required().min(3).max(40),
  email: joi.string().required().email(),
  password: joi.string().required().min(3),
});

async function signUp(req, res) {
  const user = req.body;
  const validation = signupSchema.validate(user);
  if (validation.error) {
    res.status(401).send(validation.error.details[0]);
  }
  try {
    // criar collection e alocar usuários
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
  const user = await db.collection("users").findOne({ email: req.body.email });
  const validatePw = bcrypt.compareSync(req.body.password, user.password);
  if (!user || !validatePw) {
    res.sendStatus(401);
    return;
  }

  try {
    const { insertedId } = await db
      .collection("sessios")
      .insertOne({ userId: user._id, token: uuid() });
    const session = await db.collection("sessios").findOne({ _id: insertedId });

    res
      .status(200)
      .send({ name: user.name, email: user.email, token: session.token });
  } catch (error) {
    res.sendStatus(500);
  }
}

export { signIn, signUp };
