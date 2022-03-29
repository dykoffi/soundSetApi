import express = require("express");

import app from "./app";
import createError from "http-errors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/_index";
import prometheus from "../utils/prometheus";


app.use("/sound", require("../modules/sound/sound.controller.ts")); 
app.use("/user", require("../modules/user/user.controller.ts")); 
app.use("/metrics", async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    res.setHeader("Content-Type", prometheus.contentType)
    res.send(await prometheus.metrics())
}
);
app.use("/", require("../modules/home/home.controller.ts"));
app.use("/docs", swaggerUi.serve,
    swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customSiteTitle: "soundsetapi API", customCss: ".swagger-ui .topbar {display:none}", customfavIcon: "/public/favicon.ico" }));

app.use((
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => { next(createError(404)); }
);
app.use((
    err: express.Errback,
    req: express.Request,
    res: express.Response) => {
    res.status(404).json({ error: err.name, message: "Not Found" });
});

export default app;