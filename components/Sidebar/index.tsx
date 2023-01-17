import { motion, AnimatePresence } from "framer-motion";
import BoardList from "./BoardList";
import ThemeSlider from "./ThemeSlider";
import HideSidebar from "./HideSidebar";
import { board } from "@prisma/client";

interface SidebarProps {
  boards: [board];
  currentBoard: board;
  setCurrentBoard: React.Dispatch<board>;
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<boolean>;
  toggleBoardModal: Function;
  forwardRef: React.RefObject<HTMLDivElement>;
}

const Sidebar = ({
  boards,
  isSidebarHidden,
  setIsSidebarHidden,
  forwardRef,
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
          ref={forwardRef}
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

          <div className="bottom-sidebar">
            <ThemeSlider />
            <HideSidebar setIsSidebarHidden={setIsSidebarHidden} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
