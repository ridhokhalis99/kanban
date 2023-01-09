import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalProps from "../../../interfaces/ModalProps";

interface CenteredModalProps extends ModalProps {
  title: string;
  isTitleRed?: boolean;
  children: ReactElement;
  customComponent?: ReactElement;
}

const CenteredModal = ({
  title,
  isTitleRed,
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
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 100,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => toggle()}
              style={{
                width: "100vw",
                height: "100vh",
                background: "#000000",
                mixBlendMode: "normal",
                opacity: 0.5,
                position: "absolute",
              }}
            />
            <div
              style={{
                padding: 32,
                backgroundColor: "white",
                position: "absolute",
                borderRadius: 6,
                width: 500,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  className="heading-l"
                  style={{
                    marginBottom: 24,
                    color: isTitleRed ? "#EA5555" : "#000112",
                  }}
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
