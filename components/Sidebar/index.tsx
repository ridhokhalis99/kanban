import Image from "next/image";
import logoDark from "../../assets/logo-dark.svg";
import BoardList from "./components/BoardList";
import lightThemeIcon from "../../assets/icon-light-theme.svg";
import darkThemeIcon from "../../assets/icon-dark-theme.svg";
import hideSidebarIcon from "../../assets/icon-hide-sidebar.svg";
import { Board } from "../../interfaces/Board";

interface SidebarProps {
  boards: [Board];
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<Board>;
}

const Sidebar = ({ boards, ...props }: SidebarProps) => {
  const numberOfBoards = boards.length;
  return (
    <div
      className="sidebar"
      style={{
        borderRight: "2px solid #E4EBFA",
        width: 300,
        height: "100vh",
        position: "absolute",
        left: 0,
        padding: "32px 24px 32px 0",
        backgroundColor: "#ffffff",
      }}
    >
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
          width: "100%",
          position: "absolute",
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            margin: "0 24px",
            padding: "14px 54px",
            backgroundColor: "#F4F7FD",
            borderRadius: 6,
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
        >
          <Image
            src={lightThemeIcon.src}
            alt="light theme"
            width={lightThemeIcon.width}
            height={lightThemeIcon.height}
          />

          <label className="switch">
            <input type="checkbox" />
            <span className="slider round" />
          </label>

          <Image
            src={darkThemeIcon.src}
            alt="dark theme"
            width={darkThemeIcon.width}
            height={darkThemeIcon.height}
          />
        </div>

        <div
          style={{
            margin: "0 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            cursor: "pointer",
          }}
        >
          <Image
            src={hideSidebarIcon.src}
            alt="hide sidebar"
            width={hideSidebarIcon.width}
            height={hideSidebarIcon.height}
          />
          <h3 className="heading-m">Hide Sidebar</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
