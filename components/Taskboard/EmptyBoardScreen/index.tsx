interface EmptyBoardScreenProps {
  toggleBoardModal: Function;
}

const EmptyBoardScreen = ({ toggleBoardModal }: EmptyBoardScreenProps) => {
  return (
    <div className="text-center mb-32">
      <h2 className="heading-l text-grey-82 mb-32">
        You have no board. Create a new board to get started.
      </h2>
      <button
        onClick={() => toggleBoardModal({ type: "add" })}
        className="add-button"
      >
        + Create New Board
      </button>
    </div>
  );
};

export default EmptyBoardScreen;
