import BoardDetail from "../../../interfaces/BoardDetail";
import ModalProps from "../../../interfaces/ModalProps";
import TaskDetail from "../../../interfaces/TaskDetail";
import CenteredModal from "../CenteredModal";
import { countBy, isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import useMutation from "../../../tools/useMutation";
import Image from "next/image";
import iconEllipsis from "../../../assets/icon-vertical-ellipsis.svg";
import useComponentVisible from "../../../tools/useComponentVisible";
import DropdownEllipsis from "../../DropdownEllipsis";
import { Dispatch } from "react";

interface TaskDetailModalProps extends ModalProps {
  taskDetail: TaskDetail;
  boardDetail: BoardDetail;
  setTaskDetail: Dispatch<TaskDetail>;
  toggleDeleteModal: Function;
  toggleTaskModal: Function;
}

const TaskDetailModal = ({
  isOpen,
  toggle,
  taskDetail,
  boardDetail,
  setTaskDetail,
  toggleDeleteModal,
  toggleTaskModal,
}: TaskDetailModalProps) => {
  const {
    name: taskTitle,
    column_id: defaultColumnId,
    description,
    id: taskId,
    sub_tasks,
  } = taskDetail;
  const { columns } = boardDetail;

  const { register } = useForm({
    defaultValues: {
      columnId: defaultColumnId,
    },
  });

  const finishedSubtasks =
    countBy(sub_tasks, ({ is_finished }) => is_finished).true || 0;
  const numberOfSubtasks = sub_tasks?.length;

  const { mutation: mutationSubTask } = useMutation({
    url: "/api/subtask",
    method: "patch",
  });

  const { mutation: mutationTask } = useMutation({
    url: "/api/task",
    method: "patch",
  });

  const subTaskChangeHandler = (e: any, id: number) => {
    const is_finished = e.target.checked;
    const formValue = { is_finished, id };
    mutationSubTask(formValue);
  };

  const columnChangeHandler = (e: any, taskId: number) => {
    const columnId = +e.target.value;
    mutationTask({ columnId, taskId });
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const onClickDelete = () => {
    toggleDeleteModal({ currentItem: taskDetail, type: "task" });
    setIsComponentVisible(false);
    toggle();
  };

  const onClickEdit = () => {
    toggle();
    toggleTaskModal({ type: "edit" });
  };

  return (
    <CenteredModal
      isOpen={isOpen}
      toggle={() => {
        toggle();
        setTaskDetail({} as TaskDetail);
      }}
      title={taskTitle}
      className="task-detail-modal"
      customComponent={
        <div>
          <Image
            src={iconEllipsis.src}
            alt="ellipsis"
            width={iconEllipsis.width}
            height={iconEllipsis.height}
            onClick={() => setIsComponentVisible((prev) => !prev)}
            className="cursor-pointer"
          />
          <DropdownEllipsis
            isComponentVisible={isComponentVisible}
            forwardRef={ref}
            type="task"
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
          />
        </div>
      }
      children={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {description && <p className="body-l text-grey-82">{description}</p>}
          <div>
            <p
              className="body-m text-grey-82"
              style={{
                marginBottom: !isEmpty(sub_tasks) ? "16px" : 0,
              }}
            >
              Subtasks ({finishedSubtasks} of {numberOfSubtasks})
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {sub_tasks?.map(({ name, is_finished, id }) => {
                return (
                  <div key={id} className="sub-task-container">
                    <input
                      type="checkbox"
                      defaultChecked={is_finished}
                      onChange={(e) => subTaskChangeHandler(e, +id)}
                    />
                    <label className="body-m text-grey-82">{name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="body-m text-grey-82 mb-8">Current Status</p>
            <select
              {...register(`columnId`)}
              onChange={(e) => columnChangeHandler(e, taskId)}
            >
              {columns?.map(({ name, id }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      }
    />
  );
};

export default TaskDetailModal;
