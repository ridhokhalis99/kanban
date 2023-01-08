import { ReactElement } from "react";
import crossIcon from "../../../assets/icon-cross.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface CenteredModalProps {
  title: string;
  isTitleRed?: boolean;
  isOpen: boolean;
  toggle: Function;
  children: ReactElement;
  woClose?: boolean;
}

const CenteredModal = ({
  title,
  isOpen,
  toggle,
  children,
  woClose,
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
                  style={{ marginBottom: 24, color: "#EA5555" }}
                >
                  {title}
                </h2>
                {!woClose && (
                  <Image
                    src={crossIcon.src}
                    alt="close modal"
                    width={crossIcon.width}
                    height={crossIcon.height}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggle()}
                  />
                )}
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
