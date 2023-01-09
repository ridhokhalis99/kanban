import Image from "next/image";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import BoardDropdown from "./BoardDropdown";
import useComponentVisible from "../../tools/useComponentVisible";
import logoDark from "../../assets/logo-dark.svg";
import BoardDetail from "../../interfaces/BoardDetail";
import { isEmpty } from "lodash";
import { Dispatch } from "react";

interface ControlbarProps {
  boardDetail: BoardDetail;
  toggleTaskModal: Function;
  setDeleteType: Dispatch<string>;
}

const Controlbar = ({
  boardDetail,
  toggleTaskModal,
  setDeleteType,
}: ControlbarProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { name, columns } = boardDetail || {};

  return (
    <div className="controlbar container">
      <div className="left-container">
        <>
          <Image
            src={logoDark}
            alt="kanban logo"
            width={logoDark.width}
            height={logoDark.height}
            style={{ margin: "auto" }}
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
          <button className="button-new-task" onClick={() => toggleTaskModal()}>
            + Add New Task
          </button>
        )}
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
        <BoardDropdown
          refDropdown={ref}
          isComponentVisible={isComponentVisible}
          setDeleteType={setDeleteType}
        />
      </div>
    </div>
  );
};

export default Controlbar;
