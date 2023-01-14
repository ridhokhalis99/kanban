import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const deleteTaskById = async (req: NextApiRequest, res: NextApiResponse) => {
  const taskId = req.query.id;
  if (taskId) {
    await prisma.task.delete({
      where: {
        id: +taskId,
      },
    });
    res.status(200).json({ message: "task deleted successfully" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "DELETE":
      await deleteTaskById(req, res);
      break;
  }
};

export default handler;
