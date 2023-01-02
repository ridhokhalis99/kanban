import { AnimatePresence, motion } from "framer-motion";

const BoardDropdown = ({ isShow }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "absolute",
            right: 24,
            top: 82,
            boxShadow: "#E4EBFA 0px 1px 4px",
          }}
        >
          <h3
            className="body-l"
            style={{
              color: "#828FA3",
            }}
          >
            Edit Board
          </h3>
          <h3
            className="body-l"
            style={{
              color: "#EA5555",
            }}
          >
            Delete Board
          </h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoardDropdown;
