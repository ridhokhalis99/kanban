import { board, column } from "@prisma/client";

interface BoardDetail extends board {
  columns: column[];
}

export default BoardDetail;
