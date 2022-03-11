import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import SiteRouter from "./routes/siteRoute";
import UserRouter from "./routes/userRoute";
import LogRouter from "./routes/logRoute";
import path from "path";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://audit-logger-mern.herokuapp.com"],
    credentials: true
}));

const port = config.PORT;
const mongodbURL = config.MONGODB_URL;
if(mongodbURL) mongoose.connect(mongodbURL.toString()).catch(error => console.log(`${error} connecting to DB`));

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/sites", SiteRouter);
app.use("/api/v1/logs", LogRouter);

__dirname = path.resolve();
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    app.get("/", (req: Request, res: Response) => res.send("Hello all"));
}


app.listen(port, () => console.log(`Server running on ${port}`));
