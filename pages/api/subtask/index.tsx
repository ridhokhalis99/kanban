import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const updateIsFinished = async (req: NextApiRequest, res: NextApiResponse) => {
  const formValues = req.body;
  const { is_finished, id } = formValues;

  try {
    await prisma.sub_task.update({
      data: {
        is_finished,
      },
      where: {
        id,
      },
    });
    res.status(201).json({ message: "Successfully update subtask!" });
  } catch (err) {
    res.end();
    console.log(err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "PATCH":
      await updateIsFinished(req, res);
      break;
  }
  res.end();
};

export default handler;
