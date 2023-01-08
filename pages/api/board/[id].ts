import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const readBoardById = async (req: NextApiRequest, res: NextApiResponse) => {
  const boardId = req.query.id;
  if (boardId) {
    const board = await prisma.board.findUnique({
      where: {
        id: +boardId,
      },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                sub_tasks: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(board);
  }
};

const deleteBoardById = async (req: NextApiRequest, res: NextApiResponse) => {
  const boardId = req.query.id;
  if (boardId) {
    await prisma.board.delete({
      where: {
        id: +boardId,
      },
    });
    res.status(200).json({ message: "board deleted successfully" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      await readBoardById(req, res);
      break;
    case "DELETE":
      await deleteBoardById(req, res);
      break;
  }
};

export default handler;
