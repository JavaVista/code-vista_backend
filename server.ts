import type { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// determine root domain
const rootDomain =
    process.env.NODE_ENV == 'development'
        ? process.env.ROOT_DOMAIN_DEV
        : process.env.ROOT_DOMAIN_PROD;

const app: Express = express();
const port = 3005;
const route = "/api_v1";

app.use(cookieParser());
app.use(cors({
    origin: rootDomain,
    credentials: true,
}));
app.use(bodyParser.json());

app.get(route + "/health", async (req: Request, res: Response) => {
    return res.status(200).json({
        message: "healthy",
    });
});

// route to handle favicon.ico request
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});