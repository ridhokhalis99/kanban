import ColumnDetail from "../../../interfaces/ColumnDetail";
import TaskDetail from "../../../interfaces/TaskDetail";
import { countBy, isEmpty } from "lodash";
import { Dispatch } from "react";
import BoardDetail from "../../../interfaces/BoardDetail";

interface MainScreenProps {
  columns: ColumnDetail[];
  setTaskDetail: Dispatch<TaskDetail>;
  toggleBoardModal: Function;
  boardDetail: BoardDetail;
}

const MainScreen = ({
  columns,
  setTaskDetail,
  toggleBoardModal,
  boardDetail,
}: MainScreenProps) => {
  return (
    <div className="main-container">
      {columns.map(({ name, tasks }: ColumnDetail, index) => {
        return (
          <div key={index} className="column-parent">
            <p className="heading-s uppercase">
              {name} ({tasks?.length})
            </p>
            <div className="task-container">
              {!isEmpty(tasks) ? (
                tasks?.map((task: TaskDetail, index) => {
                  const { name, sub_tasks } = task;
                  const finishedSubtasks =
                    countBy(sub_tasks, ({ is_finished }) => is_finished).true ||
                    0;
                  const numberOfSubtasks = sub_tasks?.length;

                  return (
                    <div
                      key={index}
                      className="task-item"
                      onClick={() => setTaskDetail(task)}
                    >
                      <h2 className="heading-m">{name}</h2>
                      <p className="body-m text-grey-82">
                        {finishedSubtasks} of {numberOfSubtasks} substasks
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="empty-column" />
              )}
            </div>
          </div>
        );
      })}
      <div
        onClick={() =>
          toggleBoardModal({
            type: "addColumn",
            currentBoardDetail: boardDetail,
          })
        }
        className="new-column cursor-pointer"
      >
        <h2 className="heading-xl text-grey-82 new-column-text">
          + New Column
        </h2>
      </div>
    </div>
  );
};

export default MainScreen;
