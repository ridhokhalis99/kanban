import Image from "next/image";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import BoardDropdown from "./components/BoardDropdown";
import useComponentVisible from "./hooks/useComponentVisible";
import logoDark from "../../assets/logo-dark.svg";
import BoardDetail from "../../interfaces/BoardDetail";
import { isEmpty } from "lodash";

interface ControlbarProps {
  boardDetail: BoardDetail;
  toggleTaskModal: Function;
}

const Controlbar = ({ boardDetail, toggleTaskModal }: ControlbarProps) => {
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
        />
      </div>
    </div>
  );
};

export default Controlbar;
