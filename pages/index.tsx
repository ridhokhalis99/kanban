import { useState, useEffect } from "react";
import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import prisma from "../lib/prisma";
import { Board } from "../interfaces/Board";
import { isEmpty } from "lodash";
import Taskboard from "../components/Taskboard";
import ShowSidebar from "../components/Sidebar/components/ShowSidebar";
import BoardModal from "../components/Modals/BoardModal";
import useModal from "../components/Modals/hooks/useModal";
import TaskModal from "../components/Modals/TaskModal";

interface HomeProps {
  boards: [Board];
}

export const getStaticProps = async () => {
  const boards = await prisma.board.findMany();
  return {
    props: { boards },
  };
};

const Home = ({ boards }: HomeProps) => {
  const [currentBoard, setCurrentBoard] = useState<Board>({} as Board);
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  useEffect(() => {
    if (boards.length > 0) {
      return setCurrentBoard(boards[0]);
    }
  }, []);

  const { isOpen: isOpenBoardModal, toggle: toggleBoardModal } = useModal();
  const { isOpen: isOpenTaskModal, toggle: toggleTaskModal } = useModal();

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
          currentBoard={currentBoard}
          isSidebarHidden={isSidebarHidden}
          toggleTaskModal={toggleTaskModal}
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
        <Taskboard />
      </div>

      <BoardModal isOpen={isOpenBoardModal} toggle={toggleBoardModal} />
      <TaskModal isOpen={isOpenTaskModal} toggle={toggleTaskModal} />
    </div>
  );
};

export default Home;
