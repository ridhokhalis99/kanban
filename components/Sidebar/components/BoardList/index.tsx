import { useState } from "react";
import BoardIcon from "./BoardIcon";
import { Board } from "../../../../interfaces/Board";

interface BoardListProps {
  boards: [Board];
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<Board>;
  toggleBoardModal: Function;
}

const BoardList = ({
  boards,
  currentBoard,
  setCurrentBoard,
  toggleBoardModal,
}: BoardListProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div>
      {boards.map((board: Board, index: number) => {
        const { name } = board;
        const isCurrentBoard = board === currentBoard;
        const isHovered = hoveredIndex === index;

        const currentBoardStyle = {
          backgroundColor: "#635fc7",
          color: "#ffffff",
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        };

        const hoveredStyle = {
          backgroundColor: "#efeff9",
          color: "#635fc7",
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        };

        return (
          <div
            key={index}
            onClick={() => setCurrentBoard(board)}
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
            <h3 className="heading-m">{name}</h3>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          padding: "15px 0px 15px 32px",
          gap: "16px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <BoardIcon fill="#635fc7" />
        <h3
          className="heading-m text-purple-63"
          onClick={() => toggleBoardModal()}
        >
          + Create New Board
        </h3>
      </div>
    </div>
  );
};

export default BoardList;
