import { board, task } from "@prisma/client";
import ModalProps from "../../../interfaces/ModalProps";
import useDelete from "../../../tools/useDelete";
import CenteredModal from "../CenteredModal";
import { toast } from "react-hot-toast";
import { AxiosResponse } from "axios";

interface DeleteModalProps extends ModalProps {
  type?: string;
  afterSuccess?: Function;
  currentItem?: board | task;
}

const DeleteModal = ({
  isOpen,
  toggle,
  type,
  currentItem,
  afterSuccess,
}: DeleteModalProps) => {
  const { id, name } = currentItem || {};

  const isBoard = type === "board";
  const description = isBoard
    ? `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`
    : `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`;

  const { remove } = useDelete({
    url: `/${type}/${id}`,
    formatter: ({ data }: AxiosResponse) => data,
    afterSuccess: ({ message }: { message: string }) => {
      afterSuccess && afterSuccess();
      toast.success(message);
    },
  });

  return (
    <CenteredModal
      isOpen={isOpen}
      toggle={toggle}
      title={`Delete this ${type}?`}
      isTitleRed
    >
      <div className="delete-modal">
        <p className="body-l text-grey-82">{description}</p>
        <div className="button-container">
          <button className="button delete" onClick={() => remove()}>
            Delete
          </button>
          <button className="button cancel" onClick={() => toggle()}>
            Cancel
          </button>
        </div>
      </div>
    </CenteredModal>
  );
};

export default DeleteModal;
