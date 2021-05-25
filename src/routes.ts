import { Router } from "express";

import TasksController from "./controllers/TasksController";

export const routes = Router();

routes.get("/tasks", TasksController.index);
routes.get("/tasks/:id", TasksController.show);
routes.post("/tasks", TasksController.create);
routes.put("/tasks/:id", TasksController.update);
routes.patch("/tasks/:id", TasksController.finished);
routes.delete("/tasks/:id", TasksController.delete);
