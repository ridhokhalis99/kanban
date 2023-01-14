import { PrismaClient, sub_task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const deleteTaskById = async (req: NextApiRequest, res: NextApiResponse) => {
  const taskId = req.query.id;
  if (taskId) {
    try {
      await prisma.task.delete({
        where: {
          id: +taskId,
        },
      });
      res.status(200).json({ message: "task deleted successfully" });
    } catch (err) {
      res.end();
      console.log(err);
    }
  }
};

const updateTaskById = async (req: NextApiRequest, res: NextApiResponse) => {
  const taskId = req.query.id;
  const { description, subtasks, title, columnId } = req.body;

  const updateTask = async () => {
    try {
      if (taskId)
        return await prisma.task.update({
          data: {
            name: title,
            description: description,
            column_id: +columnId,
          },
          where: {
            id: +taskId,
          },
        });
    } catch (err) {
      throw err;
    }
  };

  const deleteSubtasks = async () => {
    try {
      const subtasksIds = subtasks.map(({ id }: sub_task) => id);
      const filteredSubtasksIds = subtasksIds.filter((id: number) => id);
      if (taskId)
        return await prisma.sub_task.deleteMany({
          where: {
            id: {
              notIn: filteredSubtasksIds,
            },
            task_id: +taskId,
          },
        });
    } catch (err) {
      throw err;
    }
  };

  const upsertSubtasks = async () => {
    try {
      return await subtasks.forEach(async ({ name, id }: sub_task) => {
        if (id)
          return await prisma.sub_task.update({
            where: {
              id: +id,
            },
            data: {
              name,
            },
          });

        if (taskId)
          return await prisma.sub_task.create({
            data: {
              name,
              task: {
                connect: {
                  id: +taskId,
                },
              },
            },
          });
      });
    } catch (err) {
      throw err;
    }
  };

  if (taskId) {
    try {
      await prisma.$transaction(async () => {
        await updateTask();
        await deleteSubtasks();
        await upsertSubtasks();
      });
      //anticipate server delay
      setTimeout(
        () => res.status(200).json({ message: "Successfully update task!" }),
        500
      );
    } catch (err) {
      res.end();
      console.log(err);
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "DELETE":
      await deleteTaskById(req, res);
      break;
    case "PUT":
      await updateTaskById(req, res);
      break;
  }
  res.end();
};

export default handler;
