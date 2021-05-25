import { Tasks } from "../models/Tasks";

export default {
  render(task: Tasks) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      finished: task.finished,
      created_at: task.created_at,
      updated_at: task.updated_at,
    };
  },

  renderMany(tasks: Tasks[]) {
    return tasks.map((task) => this.render(task));
  },
};
