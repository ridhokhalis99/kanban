import Image from "next/image";
import logoDark from "../../assets/logo-dark.svg";
import BoardList from "./components/BoardList";
import { Board } from "../../interfaces/Board";
import ThemeSlider from "./components/ThemeSlider";
import HideSidebar from "./components/HideSidebar";

interface SidebarProps {
  boards: [Board];
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<Board>;
}

const Sidebar = ({ boards, ...props }: SidebarProps) => {
  const numberOfBoards = boards.length;
  return (
    <div className="sidebar container">
      <Image
        src={logoDark}
        alt="kanban logo"
        width={logoDark.width}
        height={logoDark.height}
        style={{ marginLeft: 34, marginBottom: 54 }}
      />

      <div
        style={{
          width: 276,
        }}
      >
        <h2
          className="heading-s uppercase"
          style={{
            paddingLeft: 32,
            marginBottom: 18,
          }}
        >
          All Boards ({numberOfBoards})
        </h2>

        <BoardList boards={boards} {...props} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <ThemeSlider />
        <HideSidebar />
      </div>
    </div>
  );
};

export default Sidebar;
