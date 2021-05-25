import "reflect-metadata";
import "express-async-errors";
import express from "express";

import "./database/connection";
import { routes } from "./routes";
import { errorHandler } from "./errors/handler";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server Started at http://localhost:3333");
});
