import { isEmpty } from "lodash";
import { Dispatch } from "react";
import BoardDetail from "../../interfaces/BoardDetail";
import TaskDetail from "../../interfaces/TaskDetail";
import EmptyBoardScreen from "./EmptyBoardScreen";
import EmptyColumnScreen from "./EmptyColumnScreen";
import MainScreen from "./MainScreen";
import { BounceLoader } from "react-spinners";

interface TaskboardProps {
  boardDetail: BoardDetail;
  setTaskDetail: Dispatch<TaskDetail>;
  toggleBoardModal: Function;
  loadingBoardDetail: boolean;
}

const Taskboard = ({
  boardDetail,
  setTaskDetail,
  toggleBoardModal,
  loadingBoardDetail,
}: TaskboardProps) => {
  const { columns } = boardDetail || {};

  if (loadingBoardDetail)
    return (
      <div className="taskboard empty">
        <BounceLoader color={"#635FC7"} loading={loadingBoardDetail} />
      </div>
    );

  return (
    <div className={`taskboard ${isEmpty(columns) ? "empty" : "main"}`}>
      {isEmpty(columns) ? (
        <>
          {isEmpty(boardDetail) ? (
            <EmptyBoardScreen toggleBoardModal={toggleBoardModal} />
          ) : (
            <EmptyColumnScreen
              toggleBoardModal={toggleBoardModal}
              boardDetail={boardDetail}
            />
          )}
        </>
      ) : (
        <MainScreen
          columns={columns}
          setTaskDetail={setTaskDetail}
          toggleBoardModal={toggleBoardModal}
          boardDetail={boardDetail}
        />
      )}
    </div>
  );
};

export default Taskboard;
