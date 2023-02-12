import { AnimatePresence, motion } from "framer-motion";

interface DropdownEllipsisProps {
  isComponentVisible: boolean;
  forwardRef: any;
  onClickEdit: Function;
  onClickDelete: Function;
  type: string;
}

const DropdownEllipsis = ({
  isComponentVisible,
  forwardRef,
  type,
  onClickEdit,
  onClickDelete,
}: DropdownEllipsisProps) => {
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
          <h3
            onClick={() => onClickEdit()}
            className="body-l dropdown-item edit"
          >
            Edit {type}
          </h3>
          <h3
            onClick={() => onClickDelete()}
            className="body-l dropdown-item delete"
          >
            Delete {type}
          </h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownEllipsis;
