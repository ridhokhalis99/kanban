import BoardIcon from "./BoardIcon";

interface board {
  id: number;
  name: string;
  created_at: Date;
}

interface BoardListProps {
  boards: [board];
}

const BoardList = ({ boards }: BoardListProps) => {
  return (
    <div>
      {boards.map(({ name }: board, index: number) => (
        <div
          key={index}
          style={{
            display: "flex",
            padding: "15px 92px 15px 32px",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <BoardIcon />
          <h3 className="heading-m">{name}</h3>
        </div>
      ))}
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
