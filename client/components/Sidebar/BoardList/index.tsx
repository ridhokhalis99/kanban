import { useState } from "react";
import BoardIcon from "./BoardIcon";
import { board } from "@prisma/client";

interface BoardListProps {
  boards: [board];
  currentBoard: board;
  setCurrentBoard: React.Dispatch<board>;
  toggleBoardModal: Function;
  isLightMode: boolean;
  toggleSidebar?: Function;
}

const BoardList = ({
  boards,
  currentBoard,
  setCurrentBoard,
  toggleBoardModal,
  isLightMode,
  toggleSidebar,
}: BoardListProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <>
      <div className="board-list">
        {boards.map((board: board, index: number) => {
          const { name } = board;
          const isCurrentBoard = board?.id === currentBoard?.id;
          const isHovered = hoveredIndex === index;

          const currentBoardStyle = {
            backgroundColor: "#635fc7",
            color: "#ffffff",
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
          };

          const hoveredStyle = {
            backgroundColor: isLightMode ? "#efeff9" : "#605dc71a",
            color: "#635fc7",
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
          };

          return (
            <div
              key={index}
              onClick={() => {
                toggleSidebar && toggleSidebar();
                setCurrentBoard(board);
              }}
              className="board"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                ...(isCurrentBoard ? currentBoardStyle : {}),
                ...(isHovered && !isCurrentBoard ? hoveredStyle : {}),
              }}
            >
              <BoardIcon
                fill={
                  isCurrentBoard
                    ? "#ffffff"
                    : isHovered && !isCurrentBoard
                    ? "#635fc7"
                    : "#828FA3"
                }
              />
              <h3 className="heading-m board-title">{name}</h3>
            </div>
          );
        })}
      </div>
      <div className="create-new-board">
        <BoardIcon fill="#635fc7" />
        <h3
          className="heading-m text-purple-63"
          onClick={() => {
            if (toggleSidebar) {
              toggleSidebar();
            }
            toggleBoardModal({ type: "add" });
          }}
        >
          + Create New Board
        </h3>
      </div>
    </>
  );
};

export default BoardList;
