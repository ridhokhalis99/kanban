import { motion, AnimatePresence } from "framer-motion";
import BoardList from "./components/BoardList";
import { Board } from "../../interfaces/Board";
import ThemeSlider from "./components/ThemeSlider";
import HideSidebar from "./components/HideSidebar";

interface SidebarProps {
  boards: [Board];
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<Board>;
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<boolean>;
  toggleAddBoard: Function;
}

const Sidebar = ({
  boards,
  isSidebarHidden,
  setIsSidebarHidden,
  ...props
}: SidebarProps) => {
  const numberOfBoards = boards.length;
  return (
    <AnimatePresence>
      {!isSidebarHidden && (
        <motion.div
          initial={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="sidebar container"
        >
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
            <HideSidebar setIsSidebarHidden={setIsSidebarHidden} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
