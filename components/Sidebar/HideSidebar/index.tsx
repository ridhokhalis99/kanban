import HideIcon from "./HideIcon";

interface HideSidebarProps {
  setIsSidebarHidden: React.Dispatch<boolean>;
}

const HideSidebar = ({ setIsSidebarHidden }: HideSidebarProps) => {
  return (
    <div
      className="sidebar-bottom-control"
      onClick={() => setIsSidebarHidden(true)}
    >
      <HideIcon />
      <h3 className="heading-m">Hide Sidebar</h3>
    </div>
  );
};

export default HideSidebar;
