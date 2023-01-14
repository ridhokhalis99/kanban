import { board } from "@prisma/client";
import ColumnDetail from "./ColumnDetail";

interface BoardDetail extends board {
  columns: ColumnDetail[];
}

export default BoardDetail;
