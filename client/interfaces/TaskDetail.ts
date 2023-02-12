import { sub_task, task } from "@prisma/client";

interface TaskDetail extends task {
  sub_tasks?: sub_task[];
}

export default TaskDetail;
