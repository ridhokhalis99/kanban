import ColumnDetail from "../../../../interfaces/ColumnDetail";
import TaskDetail from "../../../../interfaces/TaskDetail";
import { countBy } from "lodash";

interface MainScreenProps {
  columns: ColumnDetail[];
}

const MainScreen = ({ columns }: MainScreenProps) => {
  return (
    <>
      {columns.map(({ name, tasks }: ColumnDetail) => {
        return (
          <div
            style={{
              width: "280px",
            }}
          >
            <p className="heading-s uppercase">
              {name} ({tasks?.length})
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                paddingTop: "24px",
              }}
            >
              {tasks?.map(({ name, sub_tasks }: TaskDetail) => {
                const finishedSubtasks = countBy(
                  sub_tasks,
                  ({ is_finished }) => is_finished
                ).true;
                return (
                  <div
                    style={{
                      padding: "24px 16px",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
                    }}
                  >
                    <h2 className="heading-m">{name}</h2>
                    <p className="body-m">
                      {finishedSubtasks} of {sub_tasks?.length} substasks
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MainScreen;
