import Image from "next/image";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import DropdownEllipsis from "../DropdownEllipsis";
import useComponentVisible from "../../tools/useComponentVisible";
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";
import BoardDetail from "../../interfaces/BoardDetail";
import { isEmpty } from "lodash";
import Skeleton from "react-loading-skeleton";
import iconAddMobile from "../../assets/icon-add-task-mobile.svg";
import logoMobile from "../../assets/logo-mobile.svg";
import iconDown from "../../assets/icon-chevron-down.svg";

interface ControlbarProps {
  boardDetail: BoardDetail;
  isLightMode: boolean;
  loading: boolean;
  toggleTaskModal: Function;
  toggleDeleteModal: Function;
  toggleBoardModal: Function;
  toggleSidebarModal: Function;
}

const Controlbar = ({
  boardDetail,
  isLightMode,
  loading,
  toggleTaskModal,
  toggleDeleteModal,
  toggleBoardModal,
  toggleSidebarModal,
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
        <div className="logo">
          <Image
            src={logo.src}
            alt="kanban logo"
            width={logo.width}
            height={logo.height}
            style={{ margin: "26px 0" }}
          />
          <div className="left-container-divider" />
        </div>
        <div className="logo-mobile">
          <Image
            src={logoMobile.src}
            alt="kanban logo"
            width={logoMobile.width}
            height={logoMobile.height}
            style={{ margin: "26px 0" }}
          />
        </div>
        {loading ? (
          <div className="board-title">
            <Skeleton width={200} height={24} />
          </div>
        ) : (
          <div className="board-title-container">
            <h1 className="heading-xl board-title">{name}</h1>
            <Image
              src={iconDown.src}
              alt="chevron down"
              width={iconDown.width}
              height={iconDown.height}
              className="chevron-down"
              onClick={() => toggleSidebarModal()}
            />
          </div>
        )}
      </div>
      <div className="right-container">
        {(!isEmpty(columns) || loading) && (
          <button
            className="button-new-task"
            onClick={() => toggleTaskModal({ type: "add" })}
          >
            + Add New Task
          </button>
        )}
        {(!isEmpty(columns) || loading) && (
          <button
            className="button-new-task-mobile"
            onClick={() => toggleTaskModal({ type: "add" })}
          >
            <Image
              src={iconAddMobile.src}
              alt="add task"
              width={iconAddMobile.width}
              height={iconAddMobile.height}
            />
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
