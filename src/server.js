import express, { json } from "express";
import cors from "cors";

import joi from "joi";
import { signIn } from "./controllers/authController";

const server = express();
server.use(cors());
server.use(json());

const signupSchema = joi.object({
  name: joi.string().required().min(3).max(40),
  email: joi.string().required().email(),
  password: joi.string().required().min(3),
});

server.post("/sign-up", signIn);
