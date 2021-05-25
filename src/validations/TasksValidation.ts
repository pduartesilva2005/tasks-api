import * as Yup from "yup";

type Task = {
  title: string;
  description: string;
  finished?: boolean;
};

export async function TasksValidation(data: Task) {
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    finished: Yup.boolean(),
  });

  await schema.validate(data, {
    abortEarly: false,
  });
}
