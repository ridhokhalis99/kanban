import Image from "next/image";
import { Board } from "../../interfaces/Board";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import BoardDropdown from "./components/BoardDropdown";
import useComponentVisible from "./hooks/useComponentVisible";
import logoDark from "../../assets/logo-dark.svg";
import { board } from "@prisma/client";

interface ControlbarProps {
  currentBoard: board;
  isSidebarHidden: boolean;
  toggleTaskModal: Function;
}

const Controlbar = ({
  currentBoard,
  isSidebarHidden,
  toggleTaskModal,
}: ControlbarProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { name } = currentBoard || {};

  return (
    <div className="controlbar container">
      <div className="left-container">
        {true && (
          <>
            <Image
              src={logoDark}
              alt="kanban logo"
              width={logoDark.width}
              height={logoDark.height}
              style={{ margin: "auto" }}
            />
            <div className="left-container-divider" />
          </>
        )}
        <h1 className="heading-xl board-title">{name}</h1>
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        <button className="button-new-task" onClick={() => toggleTaskModal()}>
          + Add New Task
        </button>
        <Image
          src={iconEllipsis.src}
          alt="ellipsis"
          width={iconEllipsis.width}
          height={iconEllipsis.height}
          onClick={() => setIsComponentVisible((prev) => !prev)}
          style={{
            cursor: "pointer",
            marginRight: 32,
          }}
        />
        <BoardDropdown
          refDropdown={ref}
          isComponentVisible={isComponentVisible}
        />
      </div>
    </div>
  );
};

export default Controlbar;
