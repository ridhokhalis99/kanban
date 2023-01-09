import ColumnDetail from "../../../../interfaces/ColumnDetail";
import TaskDetail from "../../../../interfaces/TaskDetail";
import { countBy, isEmpty } from "lodash";
import { Dispatch } from "react";

interface MainScreenProps {
  columns: ColumnDetail[];
  setTaskDetail: Dispatch<TaskDetail>;
}

const MainScreen = ({ columns, setTaskDetail }: MainScreenProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
      }}
    >
      {columns.map(({ name, tasks }: ColumnDetail) => {
        return (
          <div style={{ width: "280px" }}>
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
              {!isEmpty(tasks) ? (
                tasks?.map((task: TaskDetail) => {
                  const { name, sub_tasks } = task;
                  const finishedSubtasks =
                    countBy(sub_tasks, ({ is_finished }) => is_finished).true ||
                    0;
                  const numberOfSubtasks = sub_tasks?.length;

                  return (
                    <div
                      onClick={() => setTaskDetail(task)}
                      style={{
                        width: "280px",
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
                      <p className="body-m text-grey-82">
                        {finishedSubtasks} of {numberOfSubtasks} substasks
                      </p>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    height: "calc(100vh - 200px)",
                    width: "280px",
                    border: "2px dashed #C8CFDA",
                    borderRadius: "6px",
                  }}
                ></div>
              )}
            </div>
          </div>
        );
      })}
      <div
        style={{
          width: "100%",
          borderRadius: "6px",
          marginTop: "40px",
          background:
            "linear-gradient(to bottom,rgba(121,132,147,.2),rgba(130,143,163,.1),rgba(130,143,163,0))",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          className="heading-xl text-grey-82"
          style={{
            width: "280px",
            textAlign: "center",
          }}
        >
          + New Column
        </h2>
      </div>
    </div>
  );
};

export default MainScreen;
