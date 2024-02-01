import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

const PORT = 4000;
const app = express();
app.get("/", (req, res) => {
  res.send("Hi this is the response from '/' route");
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });
app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/", authRoutes);
