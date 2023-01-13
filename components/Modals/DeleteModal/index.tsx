import { board } from "@prisma/client";
import ModalProps from "../../../interfaces/ModalProps";
import useMutation from "../../../tools/useMutation";
import CenteredModal from "../CenteredModal";

interface DeleteModalProps extends ModalProps {
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
  const description = isBoard
    ? `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`
    : `Are you sure you want to delete the ‘’ task and its subtasks? This action cannot be reversed.`;

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
        <div className="delete-modal">
          <p className="body-l text-grey-82">{description}</p>
          <div className="button-container">
            <button className="button delete" onClick={() => mutationDelete()}>
              Delete
            </button>
            <button className="button cancel" onClick={() => toggle()}>
              Cancel
            </button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteModal;
