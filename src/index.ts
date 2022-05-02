import { httpLogginMiddleware } from "./middlewares/http.logging.middleware";
import { logger } from "./config/logger.config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import jwtAuthz from "express-jwt-authz";
import {
  authOptions,
  authorizationCheck,
} from "./middlewares/authorization.middleware";
import "dotenv/config";

logger.info("Starting up the server...");

const app = express();
const port = process.env.PORT||8080;

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(httpLogginMiddleware);
app.use(authorizationCheck);

app.use((err, req, res, next) => {
  if (err.code === "permission_denied") {
    res.status(403).send("Forbidden");
  }
});

app.route("/todos").get(jwtAuthz(["read"], authOptions), (req: any, res) => {
  res.json([
    { id: 1, title: "Learn Typescript", completed: true },
    { id: 2, title: "Learn Express", completed: false },
    { id: 3, title: "Learn Node", completed: false },
  ]);
});

app.listen(port, () => logger.info(`Listening on port ${port}`));
