import { PrismaClient, Prisma, column } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const readBoardById = async (req: NextApiRequest, res: NextApiResponse) => {
  const boardId = req.query.id;
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const deleteBoardById = async (req: NextApiRequest, res: NextApiResponse) => {
  const boardId = req.query.id;
  try {
    if (boardId) {
      await prisma.board.delete({
        where: {
          id: +boardId,
        },
      });
      res.status(200).json({ message: "board deleted successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateBoardById = async (req: NextApiRequest, res: NextApiResponse) => {
  const boardId = req.query.id;
  const { board, columns } = req.body;

  const updateBoard = async () => {
    if (boardId)
      return await prisma.board.update({
        data: {
          name: board,
        },
        where: {
          id: +boardId,
        },
      });
  };

  const deleteColumns = async () => {
    const columnsIds = columns.map(({ id }: column) => id);
    const filteredColumnsIds = columnsIds.filter((id: number) => id);
    if (boardId)
      return await prisma.column.deleteMany({
        where: {
          id: {
            notIn: filteredColumnsIds,
          },
          board_id: +boardId,
        },
      });
  };

  const upsertColumns = async () => {
    return await columns.forEach(async ({ name, id }: column) => {
      if (id)
        return await prisma.column.update({
          where: {
            id: +id,
          },
          data: {
            name,
          },
        });

      if (boardId)
        return await prisma.column.create({
          data: {
            name,
            board: {
              connect: {
                id: +boardId,
              },
            },
          },
        });
    });
  };

  if (boardId) {
    try {
      await prisma.$transaction(async () => {
        await updateBoard();
        await deleteColumns();
        await upsertColumns();
      });
      res.status(200).json({ message: "Successfully update task!" });
    } catch (err) {
      console.log(err);
    }
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
    case "PUT":
      await updateBoardById(req, res);
      break;
  }
  res.end();
};

export default handler;
