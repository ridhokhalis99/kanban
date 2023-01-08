import { board } from "@prisma/client";
import useMutation from "../../../tools/useMutation";
import CenteredModal from "../CenteredModal";

interface DeleteModalProps {
  isOpen: boolean;
  toggle: Function;
  type: string;
  currentBoard: board;
  refetchBoards: Function;
}

const DeleteModal = ({
  isOpen,
  toggle,
  type,
  currentBoard,
  refetchBoards,
}: DeleteModalProps) => {
  const { id: boardId, name } = currentBoard;
  const isBoard = type === "board";
  const description = `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`;

  const { mutation: mutationDelete } = useMutation({
    url: `/api/${type}/${boardId}`,
    method: "delete",
    afterSuccess: () => {
      refetchBoards();
      toggle();
    },
  });

  return (
    <CenteredModal
      isOpen={isOpen}
      toggle={toggle}
      title={`Delete this ${type}?`}
      isTitleRed
      children={
        <div>
          <p className="body-l text-grey-82">{description}</p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <button
              style={{
                width: "50%",
                padding: "14px 0",
                backgroundColor: "#EA5555",
                color: "#ffffff",
                borderRadius: "20px",
              }}
              onClick={() => mutationDelete()}
            >
              Delete
            </button>
            <button
              style={{
                width: "50%",
                padding: "14px 0",
                backgroundColor: "#635FC71A",
                color: "#635FC7",
                borderRadius: "20px",
              }}
              onClick={() => toggle()}
            >
              Cancel
            </button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteModal;
