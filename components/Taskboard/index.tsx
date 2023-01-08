import { isEmpty } from "lodash";
import BoardDetail from "../../interfaces/BoardDetail";
import EmptyScreen from "./components/EmptyScreen";
import MainScreen from "./components/MainScreen";

interface TaskboardProps {
  boardDetail: BoardDetail;
}

const Taskboard = ({ boardDetail }: TaskboardProps) => {
  const { columns } = boardDetail;

  return (
    <div
      style={{
        backgroundColor: "#F4F7FD",
        height: "calc(100vh - 96px)",
        display: "flex",
        overflowX: "scroll",
        paddingRight: "40px",
        ...(isEmpty(columns)
          ? { alignItems: "center", justifyContent: "center" }
          : { paddingTop: "24px", paddingLeft: "18px", gap: "24px" }),
      }}
    >
      {isEmpty(columns) ? <EmptyScreen /> : <MainScreen columns={columns} />}
    </div>
  );
};

export default Taskboard;
