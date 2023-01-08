import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const formValues = req.body;
  const { title, description, subtasks, columnId } = formValues;
  let isIncludeSubtasks = Boolean(subtasks.length);
  let task: Prisma.taskCreateInput;

  if (isIncludeSubtasks) {
    task = {
      name: title,
      description,
      column: {
        connect: {
          id: +columnId,
        },
      },
      sub_tasks: {
        createMany: {
          data: subtasks,
        },
      },
    };
  } else {
    task = {
      name: title,
      description,
      column: {
        connect: {
          id: +columnId,
        },
      },
    };
  }
  try {
    await prisma.task.create({ data: task });
    res.status(201).json({ message: "Successfully create task!" });
  } catch (err) {
    console.log(err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      await createTask(req, res);
      break;
  }
};

export default handler;