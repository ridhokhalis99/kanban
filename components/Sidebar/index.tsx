import { motion, AnimatePresence } from "framer-motion";
import BoardList from "./BoardList";
import ThemeSlider from "./ThemeSlider";
import HideSidebar from "./HideSidebar";
import { board } from "@prisma/client";
import SignOut from "./SignOut";

interface SidebarProps {
  boards: [board];
  currentBoard: board;
  setCurrentBoard: React.Dispatch<board>;
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<boolean>;
  toggleBoardModal: Function;
  setIsLightMode: React.Dispatch<boolean>;
}

const Sidebar = ({
  boards,
  isSidebarHidden,
  setIsSidebarHidden,
  setIsLightMode,
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

          <div className="bottom-sidebar">
            <ThemeSlider setIsLightMode={setIsLightMode} />
            <HideSidebar setIsSidebarHidden={setIsSidebarHidden} />
            <SignOut />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
