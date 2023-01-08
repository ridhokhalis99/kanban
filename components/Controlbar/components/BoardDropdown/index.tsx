import { AnimatePresence, motion } from "framer-motion";
import { Dispatch } from "react";

interface BoardDropdownProps {
  isComponentVisible: boolean;
  refDropdown: any;
  setDeleteType: Dispatch<string>;
}

const BoardDropdown = ({
  isComponentVisible,
  refDropdown,
  setDeleteType,
}: BoardDropdownProps) => {
  return (
    <AnimatePresence>
      {isComponentVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={refDropdown}
          className="dropdown-container"
        >
          <h3 className="body-l dropdown-item edit">Edit Board</h3>
          <h3
            onClick={() => setDeleteType("board")}
            className="body-l dropdown-item delete"
          >
            Delete Board
          </h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoardDropdown;
