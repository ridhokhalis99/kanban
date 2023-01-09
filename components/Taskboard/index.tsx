import { isEmpty } from "lodash";
import { Dispatch } from "react";
import BoardDetail from "../../interfaces/BoardDetail";
import TaskDetail from "../../interfaces/TaskDetail";
import EmptyScreen from "./components/EmptyScreen";
import MainScreen from "./components/MainScreen";

interface TaskboardProps {
  boardDetail: BoardDetail;
  setTaskDetail: Dispatch<TaskDetail>;
}

const Taskboard = ({ boardDetail, setTaskDetail }: TaskboardProps) => {
  const { columns } = boardDetail;

  return (
    <div
      style={{
        backgroundColor: "#F4F7FD",
        height: "calc(100vh - 80px)",
        display: "flex",
        overflowX: "auto",
        paddingRight: "40px",
        ...(isEmpty(columns)
          ? { alignItems: "center", justifyContent: "center" }
          : { paddingTop: "24px", paddingLeft: "18px", gap: "24px" }),
      }}
    >
      {isEmpty(columns) ? (
        <EmptyScreen />
      ) : (
        <MainScreen columns={columns} setTaskDetail={setTaskDetail} />
      )}
    </div>
  );
};

export default Taskboard;
