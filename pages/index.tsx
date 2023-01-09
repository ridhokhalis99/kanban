import { useState, useEffect } from "react";
import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import { isEmpty } from "lodash";
import Taskboard from "../components/Taskboard";
import ShowSidebar from "../components/Sidebar/ShowSidebar";
import BoardModal from "../components/Modals/BoardModal";
import useModal from "../components/Modals/hooks/useModal";
import TaskModal from "../components/Modals/TaskModal";
import useFetch from "../tools/useFetch";
import { board } from "@prisma/client";
import BoardDetail from "../interfaces/BoardDetail";
import DeleteModal from "../components/Modals/DeleteModal";
import TaskDetailModal from "../components/Modals/TaskDetailModal";
import TaskDetail from "../interfaces/TaskDetail";

const Home = () => {
  const [currentBoard, setCurrentBoard] = useState<board>({} as board);
  const [boardDetail, setBoardDetail] = useState<BoardDetail>(
    {} as BoardDetail
  );
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<string>("");
  const [taskDetail, setTaskDetail] = useState<TaskDetail>({} as TaskDetail);

  const { data: boards, refetch: refetchBoards } = useFetch({
    url: "/api/board",
  });

  const { refetch: refetchBoardDetail } = useFetch({
    url: `/api/board/${currentBoard.id}`,
    afterSuccess: (res: BoardDetail) => setBoardDetail(res),
  });

  useEffect(() => {
    if (!isEmpty(boards)) {
      return setCurrentBoard(boards[0]);
    }
  }, [boards]);

  useEffect(() => {
    if (currentBoard?.id) {
      refetchBoardDetail();
    }
  }, [currentBoard]);

  useEffect(() => {
    if (deleteType) openDeleteModal();
  }, [deleteType]);

  useEffect(() => {
    if (!isEmpty(taskDetail)) openTaskDetailModal();
  }, [taskDetail]);

  const { isOpen: isOpenBoardModal, toggle: toggleBoardModal } = useModal();
  const { isOpen: isOpenTaskModal, toggle: toggleTaskModal } = useModal();
  const {
    isOpen: isOpenDeleteModal,
    toggle: toggleDeleteModal,
    open: openDeleteModal,
  } = useModal();
  const {
    isOpen: isOpenTaskDetailModal,
    toggle: toggleTaskDetailModal,
    open: openTaskDetailModal,
  } = useModal();

  return (
    <div className="light">
      <Sidebar
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        isSidebarHidden={isSidebarHidden}
        setIsSidebarHidden={setIsSidebarHidden}
        toggleBoardModal={toggleBoardModal}
      />

      {!isEmpty(currentBoard) && (
        <Controlbar
          toggleTaskModal={toggleTaskModal}
          boardDetail={boardDetail}
          setDeleteType={setDeleteType}
        />
      )}
      <div
        style={{
          width: isSidebarHidden ? "100%" : "calc(100% - 302px)",
          position: "relative",
          left: isSidebarHidden ? 0 : 302,
          transition: "all 0.3s ease-out",
        }}
      >
        {isSidebarHidden && (
          <ShowSidebar setIsSidebarHidden={setIsSidebarHidden} />
        )}
        <Taskboard boardDetail={boardDetail} setTaskDetail={setTaskDetail} />
      </div>

      <BoardModal
        isOpen={isOpenBoardModal}
        toggle={toggleBoardModal}
        refetchBoards={refetchBoards}
      />
      <TaskModal
        isOpen={isOpenTaskModal}
        toggle={toggleTaskModal}
        boardDetail={boardDetail}
        refetchBoardDetail={refetchBoardDetail}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        toggle={() => {
          toggleDeleteModal();
          setDeleteType("");
        }}
        type={deleteType}
        currentBoard={currentBoard}
        refetchBoards={refetchBoards}
      />
      <TaskDetailModal
        isOpen={isOpenTaskDetailModal}
        toggle={() => {
          refetchBoardDetail();
          toggleTaskDetailModal();
          setTaskDetail({} as TaskDetail);
        }}
        taskDetail={taskDetail}
        boardDetail={boardDetail}
        setDeleteType={setDeleteType}
      />
    </div>
  );
};

export default Home;
