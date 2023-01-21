import Image from "next/image";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import DropdownEllipsis from "../DropdownEllipsis";
import useComponentVisible from "../../tools/useComponentVisible";
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";
import BoardDetail from "../../interfaces/BoardDetail";
import { isEmpty } from "lodash";
import Skeleton from "react-loading-skeleton";

interface ControlbarProps {
  boardDetail: BoardDetail;
  toggleTaskModal: Function;
  toggleDeleteModal: Function;
  toggleBoardModal: Function;
  isLightMode: boolean;
  loadingBoardDetail: boolean;
}

const Controlbar = ({
  boardDetail,
  toggleTaskModal,
  toggleDeleteModal,
  toggleBoardModal,
  isLightMode,
  loadingBoardDetail,
}: ControlbarProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { name, columns } = boardDetail || {};

  const onClickDelete = () => {
    setIsComponentVisible(false);
    toggleDeleteModal({ currentItem: boardDetail, type: "board" });
  };

  const onClickEdit = () => {
    setIsComponentVisible(false);
    toggleBoardModal({ type: "edit", currentBoardDetail: boardDetail });
  };

  const logo = isLightMode ? logoDark : logoLight;

  return (
    <div className="controlbar container">
      <div className="left-container">
        <>
          <Image
            src={logo.src}
            alt="kanban logo"
            width={logo.width}
            height={logo.height}
            style={{ margin: "26px 0" }}
          />
          <div className="left-container-divider" />
        </>
        {loadingBoardDetail ? (
          <div className="board-title">
            <Skeleton width={200} height={24} />
          </div>
        ) : (
          <h1 className="heading-xl board-title">{name}</h1>
        )}
      </div>
      <div className="right-container">
        {(!isEmpty(columns) || loadingBoardDetail) && (
          <button
            className="button-new-task"
            onClick={() => toggleTaskModal({ type: "add" })}
          >
            + Add New Task
          </button>
        )}
        <Image
          src={iconEllipsis.src}
          alt="ellipsis"
          width={iconEllipsis.width}
          height={iconEllipsis.height}
          onClick={() => setIsComponentVisible((prev) => !prev)}
          className="cursor-pointer"
        />
        <DropdownEllipsis
          forwardRef={ref}
          isComponentVisible={isComponentVisible}
          type="board"
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      </div>
    </div>
  );
};

export default Controlbar;
