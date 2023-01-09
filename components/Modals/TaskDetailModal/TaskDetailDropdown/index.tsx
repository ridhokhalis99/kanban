import { AnimatePresence, motion } from "framer-motion";
import { Dispatch } from "react";

interface TaskDetailDropdownProps {
  isComponentVisible: boolean;
  forwardRef: any;
  setDeleteType: Dispatch<string>;
  toggleParent: Function;
}

const TaskDetailDropdown = ({
  isComponentVisible,
  forwardRef,
  setDeleteType,
  toggleParent,
}: TaskDetailDropdownProps) => {
  return (
    <AnimatePresence>
      {isComponentVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={forwardRef}
          className="dropdown-container"
        >
          <h3 className="body-l dropdown-item edit">Edit Task</h3>
          <h3
            onClick={() => {
              toggleParent();
              setDeleteType("task");
            }}
            className="body-l dropdown-item delete"
          >
            Delete Task
          </h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailDropdown;
