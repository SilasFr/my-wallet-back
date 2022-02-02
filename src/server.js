import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
  db = MongoClient.db("my-wallet");
});

const server = express();
server.use(cors());
server.use(json());

server.post("/sign-up", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});
