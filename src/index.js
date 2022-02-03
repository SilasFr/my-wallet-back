import express, { json } from "express";
import cors from "cors";

import { signIn, signUp } from "./controllers/authController.js";

const server = express();
server.use(cors());
server.use(json());

server.post("/sign-up", signUp);

server.post("/sign-in", signIn);

server.listen(5000);
