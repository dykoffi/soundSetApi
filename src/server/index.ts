/*eslint-env node*/

import http from "http";
import path from "path";
import allApp from "./_globalRoutes";
import db from "../configs/db";

const server = http.createServer(allApp);

require("dotenv").config({ path: path.resolve(process.cwd(), ".info.env") });

const port = normalizePort(process.env.PORT || "8080") ;
const apiName = process.env.API_NAME;

server.listen(port);
server.on("listening", onListenning);
server.on("clientError", onError);
server.on("close", onClose);

function normalizePort(val: string) {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}

function onError(error:any) {
    if (error.syscall !== "listen") { throw error; }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            break;

        case "EADDRINUSE":
            console.error(bind + " is already in use");
            break;

        default:
            throw error;
    }

    process.exit(1);
}

function onClose() { 
    db.$disconnect();
    process.exit(0);
}
function onListenning() {
    db.$connect()
        .then(() => { console.log("Database Connected"); })
        .catch((err: Error) => { console.error(err); });
}

console.log(`${apiName} start on port ${port}`);

export default server;
