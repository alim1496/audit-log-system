import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import config from "./config";
import UserRouter from "./routes/userRoute";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = config.PORT;
const mongodbURL = config.MONGODB_URL;

mongoose.connect(mongodbURL).catch(error => console.log(`${error} connecting to DB`));

app.get("/", (req: Request, res: Response) => res.send("Hello all"));

app.use("/api/v1/users", UserRouter);

app.listen(port, () => console.log(`Server running on ${port}`));
