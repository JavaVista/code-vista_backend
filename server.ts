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

// health check endpoint
app.get(route + "/health", async (req: Request, res: Response) => {
    return res.status(200).json({
        message: "healthy",
    });
});

// logout check endpoint
app.get(route + "/logout", async (req: Request, res: Response) => {
    res.cookie("server-access-token", { expires: Date.now() });
    res.cookie("server-refresh-token", { expires: Date.now() });
    return res.status(200).json({
        message: "Cookies are expired",
    });
});

// store auth cookies 
app.post(route + "/store-auth", async (req: Request, res: Response) => {
    if (!req?.body?.accessToken || !req?.body?.refreshToken) {
        return res.status(401).json({
            message: "missing token(s)",
        });
    }

    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;

    const dateAccessToken = new Date();
    const dateRefreshToken = new Date();

    dateAccessToken.setHours(dateAccessToken.getHours() + 1);
    dateRefreshToken.setDate(dateRefreshToken.getDate() + 1);

    res.cookie("server-access-token", accessToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        expires: dateAccessToken,
        sameSite: "lax",
    });

    res.cookie("server-refresh-token", refreshToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        expires: dateRefreshToken,
        sameSite: "lax",
    });

    return res.status(200).json({
        message: "Token(s) stored",
    });
});

// route to handle favicon.ico request
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});