import showSidebarIcon from "../../../assets/icon-show-sidebar.svg";
import Image from "next/image";

interface ShowSidebarProps {
  setIsSidebarHidden: React.Dispatch<boolean>;
}

const ShowSidebar = ({ setIsSidebarHidden }: ShowSidebarProps) => {
  return (
    <div onClick={() => setIsSidebarHidden(false)} className="show-sidebar">
      <Image
        src={showSidebarIcon.src}
        alt="show sidebar"
        width={showSidebarIcon.width}
        height={showSidebarIcon.height}
      />
    </div>
  );
};

export default ShowSidebar;
