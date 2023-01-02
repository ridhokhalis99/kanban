import BoardIcon from "./BoardIcon";
import { Board } from "../../../../interfaces/Board";

interface BoardListProps {
  boards: [Board];
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<Board>;
}

const BoardList = ({
  boards,
  currentBoard,
  setCurrentBoard,
}: BoardListProps) => {
  return (
    <div>
      {boards.map((board: Board, index: number) => {
        const { name } = board;
        const isCurrentBoard = board === currentBoard;

        const currentBoardStyle = {
          backgroundColor: "#635fc7",
          color: "#ffffff",
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        };

        return (
          <div
            key={index}
            onClick={() => setCurrentBoard(board)}
            style={{
              display: "flex",
              padding: "15px 92px 15px 32px",
              gap: "16px",
              alignItems: "center",
              cursor: "pointer",
              transition: "all .25s ease-in",
              ...(isCurrentBoard ? currentBoardStyle : {}),
            }}
          >
            <BoardIcon fill={isCurrentBoard ? "#ffffff" : "#828FA3"} />
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
        <h3 className="heading-m text-purple-63">+ Create New Board</h3>
      </div>
    </div>
  );
};

export default BoardList;
