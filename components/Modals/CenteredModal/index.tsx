import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalProps from "../../../interfaces/ModalProps";

interface CenteredModalProps extends ModalProps {
  title: string;
  isTitleRed?: boolean;
  className?: string;
  children: ReactElement;
  customComponent?: ReactElement;
}

const CenteredModal = ({
  title,
  isTitleRed,
  className,
  isOpen,
  toggle,
  children,
  customComponent,
}: CenteredModalProps) => {
  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`centered-modal-parent ${className}`}
          >
            <div
              onClick={() => toggle()}
              className="centered-modal-background"
            />
            <div className="centered-modal-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  className={`heading-l title ${isTitleRed ? "red" : "black"}`}
                >
                  {title}
                </h2>
                {customComponent}
              </div>
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default CenteredModal;
