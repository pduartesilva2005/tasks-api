import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Tasks } from "../models/Tasks";
import { TasksValidation } from "../validations/TasksValidation";
import tasksView from "../views/tasks_view";

export default {
  async index(request: Request, response: Response) {
    const tasksRepository = getRepository(Tasks);

    const tasks = await tasksRepository.find();

    return response.json(tasksView.renderMany(tasks));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const tasksRepository = getRepository(Tasks);

      const task = await tasksRepository.findOneOrFail(id);

      return response.json(tasksView.render(task));
    } catch (err) {
      return response.status(404).json({
        error: "User not found",
      });
    }
  },

  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const tasksRepository = getRepository(Tasks);

    const data = {
      title,
      description,
    };

    await TasksValidation(data);

    const task = tasksRepository.create(data);

    await tasksRepository.save(task);

    return response.json(tasksView.render(task));
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description } = request.body;

    try {
      const tasksRepository = getRepository(Tasks);

      const data = {
        title,
        description,
      };

      await tasksRepository.update(id, data);

      const task = await tasksRepository.findOneOrFail(id);

      return response.json(tasksView.render(task));
    } catch (err) {
      return response.status(404).json({
        error: "User not found",
      });
    }
  },

  async finished(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const tasksRepository = getRepository(Tasks);

      await tasksRepository.update(id, {
        finished: true,
      });

      await tasksRepository.findOneOrFail(id);

      return response.json({
        message: "Task Finished",
      });
    } catch (err) {}
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const tasksRepository = getRepository(Tasks);

      await tasksRepository.delete(id);

      return response.json({
        message: "Task deleted successfully",
      });
    } catch (err) {
      return response.status(404).json({
        error: "User not found",
      });
    }
  },
};
