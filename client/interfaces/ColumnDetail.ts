import { column, task } from "@prisma/client";

interface ColumnDetail extends column {
  tasks?: task[];
}

export default ColumnDetail;
