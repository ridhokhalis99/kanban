import Image from "next/image";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import DropdownEllipsis from "../DropdownEllipsis";
import useComponentVisible from "../../tools/useComponentVisible";
import logoDark from "../../assets/logo-dark.svg";
import BoardDetail from "../../interfaces/BoardDetail";
import { isEmpty } from "lodash";
import { Dispatch } from "react";

interface ControlbarProps {
  boardDetail: BoardDetail;
  toggleTaskModal: Function;
  toggleDeleteModal: Function;
  toggleBoardModal: Function;
}

const Controlbar = ({
  boardDetail,
  toggleTaskModal,
  toggleDeleteModal,
  toggleBoardModal,
}: ControlbarProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { name, columns } = boardDetail || {};

  const onClickDelete = () => {
    toggleDeleteModal({ currentItem: boardDetail, type: "board" });
  };

  const onClickEdit = () => {
    toggleBoardModal({ type: "edit" });
  };

  return (
    <div className="controlbar container">
      <div className="left-container">
        <>
          <Image
            src={logoDark}
            alt="kanban logo"
            width={logoDark.width}
            height={logoDark.height}
            style={{ margin: "26px 0" }}
          />
          <div className="left-container-divider" />
        </>
        <h1 className="heading-xl board-title">{name}</h1>
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        {!isEmpty(columns) && (
          <>
            <button
              className="button-new-task"
              onClick={() => toggleTaskModal({ type: "add" })}
            >
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
            <DropdownEllipsis
              forwardRef={ref}
              isComponentVisible={isComponentVisible}
              type="board"
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Controlbar;
