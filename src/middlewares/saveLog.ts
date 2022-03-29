import express from "express";
import prisma from "../configs/db";
import onFinished from "on-finished";

export default function () {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        onFinished(res, async () => {
            await prisma.log_.create(
                {
                    data:
                    {
                        protocol: req.protocol,
                        method: req.method,
                        hostname: req.hostname,
                        path: req.originalUrl || req.url,
                        httpVersion: `${req.httpVersionMajor}.${req.httpVersionMinor}`,
                        statusCode: res.statusCode,
                        userIp: req.ip,
                        userReferer: req.headers.referer,
                        userAgent: req.headers["user-agent"]
                    }
                }
            );
        });
        next();
    };
};