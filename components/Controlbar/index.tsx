import { useState } from "react";
import Image from "next/image";
import { Board } from "../../interfaces/Board";
import iconEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import BoardDropdown from "./components/BoardDropdown";

interface ControlbarProps {
  currentBoard: Board;
}

const Controlbar = ({ currentBoard }: ControlbarProps) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { name } = currentBoard || {};
  return (
    <div
      style={{
        padding: "20px 32px 28px 24px",
        borderBottom: "2px solid #E4EBFA",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <h1
        className="heading-xl"
        style={{
          padding: "4px 0",
        }}
      >
        {name}
      </h1>
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "#635FC7",
            borderRadius: 24,
            padding: "14px 24px",
            color: "white",
          }}
        >
          + Add New Task
        </button>
        <Image
          src={iconEllipsis.src}
          alt="ellipsis"
          width={iconEllipsis.width}
          height={iconEllipsis.height}
          onClick={() => setIsShowDropdown((prev) => !prev)}
          style={{
            cursor: "pointer",
          }}
        />
        <BoardDropdown isShow={isShowDropdown} />
      </div>
    </div>
  );
};

export default Controlbar;
