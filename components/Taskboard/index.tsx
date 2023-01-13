import { isEmpty } from "lodash";
import { Dispatch } from "react";
import BoardDetail from "../../interfaces/BoardDetail";
import TaskDetail from "../../interfaces/TaskDetail";
import EmptyScreen from "./EmptyScreen";
import MainScreen from "./MainScreen";

interface TaskboardProps {
  boardDetail: BoardDetail;
  setTaskDetail: Dispatch<TaskDetail>;
}

const Taskboard = ({ boardDetail, setTaskDetail }: TaskboardProps) => {
  const { columns } = boardDetail;

  return (
    <div className={`taskboard ${isEmpty(columns) ? "empty" : "main"}`}>
      {isEmpty(columns) ? (
        <EmptyScreen />
      ) : (
        <MainScreen columns={columns} setTaskDetail={setTaskDetail} />
      )}
    </div>
  );
};

export default Taskboard;
