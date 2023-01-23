import { Dispatch } from "react";
import { board } from "@prisma/client";
import BoardList from "../../Sidebar/BoardList";
import ThemeSlider from "../../Sidebar/ThemeSlider";
import HideSidebar from "../../Sidebar/HideSidebar";
import SignOut from "../../Sidebar/SignOut";
import CenteredModal from "../CenteredModal";

interface SidebarModalProps {
  isOpen: boolean;
  toggle: Function;
  boards: [board];
  currentBoard: board;
  setCurrentBoard: Dispatch<board>;
  toggleBoardModal: Function;
  isLightMode: boolean;
  setIsLightMode: Dispatch<boolean>;
}

const SidebarModal = ({
  isOpen,
  toggle,
  boards,
  setIsLightMode,
  ...props
}: SidebarModalProps) => {
  const numberOfBoards = boards.length;
  return (
    <CenteredModal
      isOpen={isOpen}
      toggle={toggle}
      style={{
        paddingLeft: 0,
      }}
    >
      <div className="sidebar sidebar-modal">
        <div>
          <h2 className="heading-s uppercase board-list-heading">
            All Boards ({numberOfBoards})
          </h2>
          <BoardList boards={boards} toggleSidebar={toggle} {...props} />
        </div>

        <div className="bottom-sidebar">
          <ThemeSlider setIsLightMode={setIsLightMode} />
          <SignOut />
        </div>
      </div>
    </CenteredModal>
  );
};

export default SidebarModal;
