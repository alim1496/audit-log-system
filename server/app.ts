import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import SiteRouter from "./routes/siteRoute";
import UserRouter from "./routes/userRoute";
import LogRouter from "./routes/logRoute";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

const port = config.PORT;
const mongodbURL = config.MONGODB_URL;
if(mongodbURL) mongoose.connect(mongodbURL.toString()).catch(error => console.log(`${error} connecting to DB`));

app.get("/", (req: Request, res: Response) => res.send("Hello all"));

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/sites", SiteRouter);
app.use("/api/v1/logs", LogRouter);

app.listen(port, () => console.log(`Server running on ${port}`));
