import express from "express";
import { cwd } from "process";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";
import cors from "cors";
import compression from "compression";
import favicon from "serve-favicon";

import saveLog from "../middlewares/saveLog";

const ExpressApp = express();

ExpressApp.use(compression());
ExpressApp.use(helmet());
ExpressApp.use(cors());
ExpressApp.use(saveLog());
ExpressApp.use(morgan("dev"));
ExpressApp.use(favicon(join(cwd(), "public/favicon.ico")));
ExpressApp.use(express.urlencoded({ extended: false }));
ExpressApp.use("/public", express.static(join(cwd(), "public")));
ExpressApp.use(express.json());

export default ExpressApp;