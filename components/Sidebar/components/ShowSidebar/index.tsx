import showSidebarIcon from "../../../../assets/icon-show-sidebar.svg";
import Image from "next/image";

interface ShowSidebarProps {
  setIsSidebarHidden: React.Dispatch<boolean>;
}

const ShowSidebar = ({ setIsSidebarHidden }: ShowSidebarProps) => {
  return (
    <div
      onClick={() => setIsSidebarHidden(false)}
      style={{
        padding: "19px 22px 19px 19px",
        backgroundColor: "#A8A4FF",
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        position: "absolute",
        bottom: 32,
        cursor: "pointer",
      }}
    >
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
