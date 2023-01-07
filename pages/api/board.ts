import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const createBoard = async (req: NextApiRequest, res: NextApiResponse) => {
  const formValues = req.body;
  const { columns, board: boardTitle } = formValues;
  let isIncludeColumns = Boolean(columns.length);
  let board: Prisma.boardCreateInput;

  if (isIncludeColumns) {
    board = {
      name: boardTitle,
      columns: {
        createMany: {
          data: columns,
        },
      },
    };
  } else {
    board = { name: boardTitle };
  }
  try {
    await prisma.board.create({ data: board });
    res.status(201).json({ message: "Successfully create board!" });
  } catch (err) {
    console.log(err);
  }
};

const readBoard = async (req: NextApiRequest, res: NextApiResponse) => {
  const boards = await prisma.board.findMany();
  res.status(200).json(boards);
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      readBoard(req, res);
      break;
    case "POST":
      createBoard(req, res);
      break;
  }
};

export default handler;
