import { useState, useEffect, useRef } from "react";
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
import useWindowSize from "../tools/useWindowSize";
import SidebarModal from "../components/Modals/SidebarModal";

const Home = () => {
  const [currentBoard, setCurrentBoard] = useState<board>({} as board);
  const [boardDetail, setBoardDetail] = useState<BoardDetail>(
    {} as BoardDetail
  );
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
  const [taskDetail, setTaskDetail] = useState<TaskDetail>({} as TaskDetail);
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [width] = useWindowSize();

  const {
    data: boards,
    refetch: refetchBoards,
    loading: loadingBoards,
  } = useFetch({
    url: "/board",
    formatter: (boards: board[]) =>
      boards.sort((a, b) => a.name.localeCompare(b.name)),
  });

  const { refetch: refetchBoardDetail, loading: loadingBoardDetail } = useFetch(
    {
      url: `/board/${currentBoard?.id}`,
      afterSuccess: (boardDetail: BoardDetail) => {
        setBoardDetail({ ...boardDetail });
      },
      woFetchFirst: true,
    }
  );

  useEffect(() => {
    const latestBoard = boards.find(({ id }: board) => id === currentBoard?.id);
    if (isEmpty(boards) && !loadingBoards) {
      return setCurrentBoard({} as board);
    }
    if (latestBoard) return setCurrentBoard({ ...latestBoard });
    setCurrentBoard({ ...boards[0] });
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

  useEffect(() => {
    if (width && width < 768) setIsSidebarHidden(true);
  }, [width]);

  const loading = loadingBoards || loadingBoardDetail;

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
  const { isOpen: isOpenSidebarModal, toggle: toggleSidebarModal } = useModal();

  return (
    <div className={`main-container ${isLightMode ? "light" : "dark"}`}>
      <Sidebar
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        isSidebarHidden={isSidebarHidden}
        setIsSidebarHidden={setIsSidebarHidden}
        toggleBoardModal={toggleBoardModal}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />
      <Controlbar
        boardDetail={boardDetail}
        isLightMode={isLightMode}
        loading={loading}
        toggleTaskModal={toggleTaskModal}
        toggleBoardModal={toggleBoardModal}
        toggleDeleteModal={toggleDeleteModal}
        toggleSidebarModal={toggleSidebarModal}
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
          loadingBoardDetail={loadingBoardDetail}
        />
      </div>

      <BoardModal
        isOpen={isOpenBoardModal}
        toggle={toggleBoardModal}
        refetchBoards={refetchBoards}
        setBoardDetail={setBoardDetail}
        setCurrentBoard={setCurrentBoard}
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
      <SidebarModal
        isOpen={isOpenSidebarModal}
        toggle={toggleSidebarModal}
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        toggleBoardModal={toggleBoardModal}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
      />
    </div>
  );
};

export default Home;
