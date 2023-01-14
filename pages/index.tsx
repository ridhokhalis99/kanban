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
  const [taskDetail, setTaskDetail] = useState<TaskDetail>({} as TaskDetail);

  const {
    data: boards,
    refetch: refetchBoards,
    loading: loadingBoards,
  } = useFetch({
    url: "/api/board",
  });

  const { refetch: refetchBoardDetail } = useFetch({
    url: `/api/board/${currentBoard?.id}`,
    afterSuccess: (boardDetail: BoardDetail) => {
      setBoardDetail({ ...boardDetail });
    },
  });

  useEffect(() => {
    const latestBoard = boards.find(({ id }: board) => id === currentBoard?.id);
    if (isEmpty(boards) && !loadingBoards) {
      return setCurrentBoard({} as board);
    }
    if (latestBoard) return setCurrentBoard({ ...latestBoard });
  }, [boards]);

  useEffect(() => {
    if (currentBoard?.id) {
      refetchBoardDetail();
    }
    setBoardDetail({} as BoardDetail);
  }, [currentBoard]);

  useEffect(() => {
    if (!isEmpty(taskDetail)) openTaskDetailModal();
  }, [taskDetail]);

  const {
    isOpen: isOpenBoardModal,
    toggle: toggleBoardModal,
    props: propsBoardModal,
  } = useModal();
  const {
    isOpen: isOpenTaskModal,
    toggle: toggleTaskModal,
    props: propsTaskModal,
  } = useModal();
  const {
    isOpen: isOpenDeleteModal,
    toggle: toggleDeleteModal,
    props: deleteModalProps,
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
      <Controlbar
        toggleTaskModal={toggleTaskModal}
        boardDetail={boardDetail}
        toggleBoardModal={toggleBoardModal}
        toggleDeleteModal={toggleDeleteModal}
      />
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
        <Taskboard
          boardDetail={boardDetail}
          setTaskDetail={setTaskDetail}
          toggleBoardModal={toggleBoardModal}
        />
      </div>

      <BoardModal
        isOpen={isOpenBoardModal}
        toggle={toggleBoardModal}
        refetchBoards={refetchBoards}
        {...propsBoardModal}
      />
      <TaskModal
        isOpen={isOpenTaskModal}
        toggle={toggleTaskModal}
        boardDetail={boardDetail}
        refetchBoardDetail={refetchBoardDetail}
        {...propsTaskModal}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        toggle={toggleDeleteModal}
        afterSuccess={() => {
          toggleDeleteModal();
          refetchBoards();
        }}
        {...deleteModalProps}
      />
      <TaskDetailModal
        isOpen={isOpenTaskDetailModal}
        toggle={() => {
          refetchBoardDetail();
          toggleTaskDetailModal();
        }}
        taskDetail={taskDetail}
        boardDetail={boardDetail}
        setTaskDetail={setTaskDetail}
        toggleTaskModal={toggleTaskModal}
        toggleDeleteModal={toggleDeleteModal}
      />
    </div>
  );
};

export default Home;
