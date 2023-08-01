import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import jsonData from "./data.json";
import cors, { CorsOptions } from "cors";

config();

const allowedOrigins = ['http://localhost:3000'];

const options: CorsOptions = {
  origin: allowedOrigins
};

const app: Application = express();
app.use(cors(options));
const PORT = 7777;

//Route for getting data in root path
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send(jsonData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});